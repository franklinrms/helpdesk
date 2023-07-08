/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
      fontSize: {
        'dynamic-sm': 'clamp(1rem, 5vw, 1.25rem)',
        dynamic: 'clamp(1.5rem, 5vw, 1.75rem)',
        'dynamic-xl': 'clamp(2.375rem, 8vw, 5rem)',
      },
    },
  },
  plugins: [],
}
