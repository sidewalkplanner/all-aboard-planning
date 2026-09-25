"""Procedural, seamlessly tiling paper textures for the collage theme.

Run: python3 art/textures.py  (writes to src/assets/textures/)
All noise is built in the frequency domain, so every tile wraps perfectly.
"""
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = 'src/assets/textures/'
rng = np.random.default_rng(7)


def spectral_noise(n, beta, lo=1, hi=None):
    """Tileable 1/f^beta noise, normalised to 0..1."""
    fx = np.fft.fftfreq(n)[:, None] * n
    fy = np.fft.fftfreq(n)[None, :] * n
    f = np.sqrt(fx ** 2 + fy ** 2)
    amp = np.zeros_like(f)
    mask = f >= lo
    if hi:
        mask &= f <= hi
    amp[mask] = 1 / f[mask] ** beta
    phase = rng.uniform(0, 2 * np.pi, (n, n))
    field = np.real(np.fft.ifft2(amp * np.exp(1j * phase)))
    field -= field.min()
    return field / field.max()


def fibers(n, count, length, width, angle_spread=np.pi):
    """Short curved paper fibres drawn with wrap-around."""
    canvas = np.zeros((n, n))
    for _ in range(count):
        x, y = rng.uniform(0, n, 2)
        a = rng.uniform(0, angle_spread)
        L = rng.uniform(length * 0.4, length)
        curve = rng.normal(0, 0.03)
        strength = rng.uniform(0.3, 1)
        for t in np.linspace(0, L, int(L * 2)):
            a += curve
            px = int(x + np.cos(a) * t) % n
            py = int(y + np.sin(a) * t) % n
            canvas[py, px] = max(canvas[py, px], strength)
    return ndimage.gaussian_filter(canvas, width, mode='wrap')


def save(arr_rgb, name, alpha=None, quality=88):
    arr = np.clip(arr_rgb, 0, 255).astype(np.uint8)
    if alpha is not None:
        a = np.clip(alpha, 0, 255).astype(np.uint8)
        img = Image.fromarray(np.dstack([arr, a]), 'RGBA')
    else:
        img = Image.fromarray(arr, 'RGB')
    img.save(OUT + name + '.webp', quality=quality, method=6)


def paper(n, base, mottle=10, grain=9, fiber_amt=14, speck=0.0006, fiber_col=None):
    base = np.array(base, float)
    m = spectral_noise(n, 1.6, lo=1, hi=40) - 0.5
    g = spectral_noise(n, 0.4, lo=60) - 0.5
    fb = fibers(n, int(n * n / 900), 26, 0.6)
    fb2 = fibers(n, int(n * n / 2600), 40, 0.9)
    lum = m * mottle + g * grain - fb * fiber_amt + fb2 * fiber_amt * 0.6
    rgb = base[None, None, :] + lum[..., None]
    if fiber_col is not None:
        rgb += (fb2[..., None] * (np.array(fiber_col) - base)[None, None, :]) * 0.25
    sp = rng.random((n, n)) < speck
    sp = ndimage.gaussian_filter(sp.astype(float), 0.7, mode='wrap')
    rgb -= sp[..., None] * 260
    return rgb


# 1. Cream drawing paper: the site background.
save(paper(512, (246, 239, 225), mottle=9, grain=7, fiber_amt=7, speck=0.00008), 'paper-cream', quality=92)
# 2. Kraft paper for accent bands.
save(paper(512, (205, 170, 122), mottle=16, grain=11, fiber_amt=13, speck=0.0004, fiber_col=(150, 110, 70)), 'paper-kraft')
# 3. Blueprint paper (dark mode / exam runner night mode).
bp = paper(512, (22, 44, 78), mottle=10, grain=6, fiber_amt=-9, speck=0)
save(bp, 'paper-blueprint')
# 4. Grain overlay: transparent-ish multiply layer for cards and cutouts.
n = 384
g = spectral_noise(n, 0.3, lo=40) - 0.5
m = spectral_noise(n, 1.5, lo=1, hi=24) - 0.5
fb = fibers(n, 170, 22, 0.55)
dark = np.clip(g * 40 + m * 18 + fb * 26 + 8, 0, 255)
save(np.full((n, n, 3), (70, 52, 30), float), 'grain', alpha=dark * 1.35)
print('textures written')
