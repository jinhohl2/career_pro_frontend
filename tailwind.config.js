// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       aspectRatio: {
//         'picture': '1.5',
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        '#5680E9' : '#5680E9', 
        '#84CEEB' : '#84CEEB', 
        '#5AB9EA' : '#5AB9EA', 
        '#C1C8E4' : '#C1C8E4', 
        '#3AAFA9' : '#3AAFA9'
      },
      minHeight: {
        '3rem': '3rem',
      },
      minWidth: {
        '25rem':'25rem'
      }
    }
  },
  plugins: [],
};

