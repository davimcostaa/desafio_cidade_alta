/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'character': "url('/images/bg-character.png')",
      },
      colors: {
        "primary": "#11131d",
        "blue": "#4ac5f3",
        "orange": "#ffc046"
      }
    },
  },
  plugins: [],
};
