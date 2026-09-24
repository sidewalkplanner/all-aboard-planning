import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { renderMarkdown } from './scripts/markdown.mjs'

// Lesson bodies are authored as Markdown (src/content/aicp/lessons/*.md) and
// rendered to HTML here, at build time, so no Markdown parser ships to the
// browser. Each .md module exports { html, headings }.
function lessonMarkdown() {
  let base = '/'
  return {
    name: 'lesson-markdown',
    configResolved(config) {
      base = config.base
    },
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.md')) return null
      const { html, headings } = renderMarkdown(code, { base })
      return { code: `export default ${JSON.stringify({ html, headings })};`, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [lessonMarkdown(), react()],
  // GitHub Pages serves this as a project site at /all-aboard-planning/,
  // so asset URLs need that prefix baked in.
  base: '/all-aboard-planning/',
})
