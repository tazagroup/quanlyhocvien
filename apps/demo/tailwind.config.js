const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const colors = require('tailwindcss/colors');

const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      pink: colors.pink,
      gray: colors.slate,
      red: colors.red,
      orange: {
        500: '#BC4F38',
      },
      amber: colors.amber,
      green: {
        500: '#98CC6F',
        600: '#4E7661',
      },
      teal: colors.teal,
      blue: colors.blue,
      yellow: {
        500: '#FBB01A',
      },
      indigo: {
        900: '#00256e',
      },
      purple: colors.purple,
    },
    fontFamily: {
      mt: ['utm'],
      gb: ['utm'],
    },
    
  },
  plugins: [],
};
