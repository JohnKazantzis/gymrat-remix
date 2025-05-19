export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        'brink-pink': {
          '50': '#fff1f3',
          '100': '#ffe3e7',
          '200': '#ffccd5',
          '300': '#ffa1b2',
          '400': '#ff6685',
          '500': '#f93a66',
          '600': '#e71751',
          '700': '#c30d43',
          '800': '#a30e40',
          '900': '#8b103d',
          '950': '#4e031c',
        },
      }
    },
  },
  plugins: [],
};
