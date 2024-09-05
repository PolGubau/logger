const { poluiPlugin } = require('pol-ui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/ui/**/*.{tsx}', './website/**/*.{tsx}', './node_modules/pol-ui/lib/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [poluiPlugin()],
};
