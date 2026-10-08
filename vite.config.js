import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (p) => fileURLToPath(new URL(p, import.meta.url))

// GitHub Pages serves this site at https://ydesai877.github.io/Portfolio/
// "base" must match the repository name. If you rename the repo, change it here.
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  build: {
    // One HTML file per page, so each page has its own address.
    rollupOptions: {
      input: {
        about: page('./index.html'),
        resume: page('./resume/index.html'),
        projects: page('./projects/index.html'),
        blogs: page('./blogs/index.html'),
        contact: page('./contact/index.html'),
      },
    },
  },
})
