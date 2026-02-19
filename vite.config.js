import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/main.js',   // this mounts Editor
      name: 'Editor',
      fileName: 'editor'
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})
