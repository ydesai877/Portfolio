import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this site at https://ydesai877.github.io/Portfolio/
// "base" must match the repository name. If you rename the repo, change it here.
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
