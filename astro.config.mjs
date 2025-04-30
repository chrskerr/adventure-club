import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), mdx()],
  site: 'https://www.adventure-club.com.au/',
  adapter: cloudflare({ imageService: 'cloudflare' }),
})
