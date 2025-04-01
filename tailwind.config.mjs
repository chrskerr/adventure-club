import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import tailwindScrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        base: '10px',
      },
      boxShadow: {
        light: '0px 4px 0px 0px #000',
        dark: '0px 4px 0px 0px #000',
      },
      translate: {
        boxShadowX: '0px',
        boxShadowY: '4px',
        reverseBoxShadowX: '0px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '400',
        heading: '600',
      },
      screens: {
        w700: { max: '700px' },
        w500: { max: '500px' },
        w400: { max: '400px' },
      },
      typography: (theme) => ({
        lightMode: {
          css: {
            '--tw-prose-kbd': theme('colors.text'),
            '--tw-prose-quote-borders': theme('colors.text'),
            '--tw-prose-bullets': theme('colors.text'),
            '--tw-prose-code': theme('colors.text'),
          },
        },
        darkMode: {
          css: {
            '--tw-prose-kbd': theme('colors.darkText'),
            '--tw-prose-quote-borders': theme('colors.darkText'),
            '--tw-prose-bullets': theme('colors.darkText'),
            '--tw-prose-code': theme('colors.darkText'),
          },
        },
      }),
    },
  },
  plugins: [typography, tailwindScrollbar],
  darkMode: 'class',
}
