import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { renderMarkdown, extractKeyTerms } from './scripts/markdown.mjs'

// Lesson bodies are authored as Markdown (src/content/aicp/lessons/*.md) and
// rendered to HTML here, at build time, so no Markdown parser ships to the
// browser. Each .md module exports { html, headings, checkpoints }.
function lessonMarkdown() {
  let base = '/'
  return {
    name: 'lesson-markdown',
    configResolved(config) {
      base = config.base
    },
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.md')) return null
      const { html, headings, checkpoints } = renderMarkdown(code, { base })
      return { code: `export default ${JSON.stringify({ html, headings, checkpoints })};`, map: null }
    },
  }
}

// virtual:aicp-flashcards exports every lesson's key terms as flashcards:
// { [lessonSlug]: [{ id, term, html }] }. Built from the Markdown, so cards
// stay in sync with the lessons automatically.
const LESSON_DIR = fileURLToPath(new URL('./src/content/aicp/lessons/', import.meta.url))
function flashcards() {
  const id = 'virtual:aicp-flashcards'
  return {
    name: 'aicp-flashcards',
    resolveId(source) {
      return source === id ? '\0' + id : null
    },
    load(resolved) {
      if (resolved !== '\0' + id) return null
      const deck = {}
      for (const f of readdirSync(LESSON_DIR).filter((x) => x.endsWith('.md'))) {
        this.addWatchFile(LESSON_DIR + f)
        const slug = f.replace(/\.md$/, '')
        deck[slug] = extractKeyTerms(readFileSync(LESSON_DIR + f, 'utf8'), slug)
      }
      return `export default ${JSON.stringify(deck)};`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [lessonMarkdown(), flashcards(), react()],
  // GitHub Pages serves this as a project site at /all-aboard-planning/,
  // so asset URLs need that prefix baked in.
  base: '/all-aboard-planning/',
})
