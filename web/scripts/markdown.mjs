// Shared Markdown → HTML renderer for lesson bodies. Used at build time by
// the Vite plugin in vite.config.js (so no Markdown parser ships to the
// browser) and by scripts/check-content.mjs (so the checker sees exactly the
// headings and links the site renders).
import { Marked } from 'marked';

const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');

export const slugify = (s) => stripTags(s)
  .toLowerCase()
  .replace(/&[a-z0-9#]+;/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// VIDEO SLOTS. A block like
//
//   :::video Nollan and Dolan: the two-part test | 4 min
//   What the video covers, in a sentence or two.
//   :::
//
// renders a clearly marked "video coming soon" placeholder. Add a third field
// with an embed URL (https only, e.g. https://www.youtube-nocookie.com/embed/ID)
// and it renders the video instead:
//
//   :::video Nollan and Dolan: the two-part test | 4 min | https://…
const videoExtension = (videos) => ({
  name: 'video',
  level: 'block',
  start(src) {
    const m = src.match(/^:::video/m);
    return m ? m.index : undefined;
  },
  tokenizer(src) {
    const m = /^:::video[ \t]+([^\n]+)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
    if (!m) return undefined;
    const [title = '', length = '', url = ''] = m[1].split('|').map((x) => x.trim());
    const body = m[2].trim();
    const token = { type: 'video', raw: m[0], title, length, url, tokens: this.lexer.inlineTokens(body) };
    videos.push({ title, length, url });
    return token;
  },
  renderer(token) {
    const id = `video-${slugify(token.title)}`;
    const desc = this.parser.parseInline(token.tokens);
    const soon = token.url ? '' : ' <span class="visually-hidden">(coming soon)</span>';
    const caption = `<figcaption><span class="video-label">Video</span> <strong>${token.title}</strong>${soon}${token.length ? ` <span class="video-length">· ${token.length}</span>` : ''}<br>${desc}</figcaption>`;
    if (token.url) {
      return `<figure class="video-slot" id="${id}"><div class="video-frame"><iframe src="${escapeAttr(token.url)}" title="${escapeAttr(token.title)}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>${caption}</figure>\n`;
    }
    return `<figure class="video-slot video-slot-empty" id="${id}"><div class="video-frame" aria-hidden="true"><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="27" fill="none" stroke="currentColor" stroke-width="2"/><path d="M23 18 L39 28 L23 38 Z" fill="currentColor"/></svg><span>Video coming soon</span></div>${caption}</figure>\n`;
  },
});

// Returns { html, headings, links, videos }.
// - headings: every h2 as { id, text }, in order (drives "In this lesson").
// - links: every href as written in the source (for the link checker).
// Root-relative links ("/aicp/...") get the deploy base path prepended so
// they work as real hrefs; LessonBody intercepts clicks on them and routes
// client-side.
export function renderMarkdown(src, { base = '/' } = {}) {
  const headings = [];
  const links = [];
  const videos = [];
  const used = new Map();
  const basePrefix = base.replace(/\/$/, '');
  const marked = new Marked({ gfm: true });
  marked.use({ extensions: [videoExtension(videos)] });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(inner) || 'section';
        const n = used.get(id) || 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (depth === 2) headings.push({ id, text: stripTags(inner) });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        links.push(href);
        const internal = href.startsWith('/');
        const out = internal ? basePrefix + href : href;
        const t = title ? ` title="${escapeAttr(title)}"` : '';
        const ext = internal || href.startsWith('#') ? '' : ' rel="noopener noreferrer"';
        return `<a href="${escapeAttr(out)}"${t}${ext}>${inner}</a>`;
      },
      table(token) {
        // Wrap tables so they scroll sideways on phones instead of
        // stretching the page.
        const html = marked.Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>\n`;
      }
    }
  });
  const html = marked.parse(src);
  return { html, headings, links, videos };
}
