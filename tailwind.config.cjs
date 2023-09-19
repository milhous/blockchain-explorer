/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        inherit: 'inherit',
        transparent: 'transparent',
        currentColor: 'currentColor',
        green: '#75BF72',
        red: '#DF5060',
        yellow: '#f7941d',
        borderColor: '#eaeaea',
        borderDarkColor: '#333',
        textColor: '#666',
        textDarkColor: '#888',
        hoverColor: '#171717',
        hoverDarkColor: '#ededed',
        bgColor: '#fafafa',
        bgDarkColor: '#0a0a0a',
        highlightBgColor: 'rgba(0, 0, 0, 0.05)',
        highlightBgDarkColor: 'rgba(255, 255, 255, 0.06)',
        boxColor: '#fff',
        boxDarkColor: '#0a0a0a',
        disabledColor: '#fafafa',
        disabledDarkColor: '#111',
      },
    },
  },
  plugins: [],
};
