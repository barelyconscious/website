import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      // Parse markdown frontmatter at build time (Node context) so gray-matter
      // never ships to the browser. Emits structured exports per .md file.
      name: 'markdown-frontmatter-loader',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.md')) return
        const { data, content } = matter(code)
        const file = id.split('/').pop()!.replace(/\.md$/, '')
        const fileSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
        const frontmatter = {
          slug: fileSlug,
          tags: [] as string[],
          draft: false,
          ...data,
        }
        return {
          code:
            `export const frontmatter = ${JSON.stringify(frontmatter)};\n` +
            `export const content = ${JSON.stringify(content)};\n` +
            `export default content;`,
          map: null,
        }
      },
    },
  ],
})
