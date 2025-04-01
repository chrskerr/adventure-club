import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import expressiveCode from 'astro-expressive-code'
import tailwindcss from "@tailwindcss/vite";

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({vite: {plugins: [tailwindcss()]},
  integrations: [
    react(),
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        frames: {
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabBorderColor: '#80808080',
          editorTabBarBorderBottomColor: '#80808080',
          tooltipSuccessBackground: 'black',
        },
        uiFontFamily: 'inherit',
        borderColor: '#80808080',
      },
    }),
    mdx(),
  ],
  site: 'https://neobrutalism-blog.netlify.app/',
})
