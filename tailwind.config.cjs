/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
            sans: ['Outfit'],
            mono: ['Source Code Pro']
          },
    },
  },
  plugins: [],
}

