import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      // Match both lower and upper-case extensions
      include: /^[^?#]*\.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)(\?.*)?$/i,
    }),
  ],
})
