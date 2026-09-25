# Collage artwork

Every illustration on the site is generated from code in this folder and
baked to WebP, so the hand-made look costs nothing at runtime.

The style is a planner's scrapbook: cut and torn paper in the land-use map
palette (yellow residential, red commercial, purple industrial, green open
space, blue civic), ink lines drawn slightly off-register, masking tape, and
pencil notes in Caveat.

## Layout

- `lib/draw.mjs`: the drawing kit. `inkLine`/`ink` turn geometry into
  pressure-varying pen strokes (perfect-freehand) that wobble and overshoot.
  `cut` makes scissor-cut paper, `torn` makes torn paper with a white fibre
  rim, and `hatch`, `stipple` and `contours` add shading. `defs()` holds the
  shared `paper` grain filter and the `lift` contact shadow.
- `lib/props.mjs`: reusable props: houses, blocks, city hall, trees,
  clouds, the sun, the streetcar, people, bikes, tape and stars.
- `scenes/*.mjs`: one file per group of assets. Each default export returns
  a list of `{ name, w, h, svg, scale?, quality? }`. A list can carry a
  `meta` object, which is written to `src/data/artMeta.json` (the hero
  uses it to line the animated tram up with the rails).
- `render.mjs`: rasterises the scenes with Chromium into `public/art/`.
  Assets marked `keepSvg` are written as SVG instead (the torn edges and
  scribbles used as CSS masks, in `src/assets/textures/`).
- `textures.py`: seamlessly tiling paper textures (cream, kraft, blueprint,
  grain) in `src/assets/textures/`.

## Rendering

```sh
npm run art                 # everything
npm run art -- hero badge   # only assets whose name contains "hero" or "badge"
npm run art:textures        # paper textures (needs numpy, scipy, pillow)
```

The renderer needs a Chromium binary. It uses `CHROMIUM_PATH` if set,
otherwise the Playwright browser cache location. Output is deterministic:
every random choice comes from a seeded RNG, so re-rendering an unchanged
scene produces the same drawing.

The social card (`scenes/og.mjs`) renders to `public/art/og-image.png`;
convert it to `public/og-image.jpg` for a smaller file.
