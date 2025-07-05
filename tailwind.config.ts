import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <-- Make sure this line is here!
  ],
  theme: {
    extend: {
      // You can add theme extensions here if needed later
    },
  },
  plugins: [],
}
export default config