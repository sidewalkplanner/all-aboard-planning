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

// Returns { html, headings, links }.
// - headings: every h2 as { id, text }, in order (drives "In this lesson").
// - links: every href as written in the source (for the link checker).
// Root-relative links ("/aicp/...") get the deploy base path prepended so
// they work as real hrefs; LessonBody intercepts clicks on them and routes
// client-side.
export function renderMarkdown(src, { base = '/' } = {}) {
  const headings = [];
  const links = [];
  const used = new Map();
  const basePrefix = base.replace(/\/$/, '');
  const marked = new Marked({ gfm: true });
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
  return { html, headings, links };
}
