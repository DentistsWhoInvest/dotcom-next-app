import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	screens: {
		'sm': '320px',
		'md': '768px',
		'lg': '1024px',
		'xl': '1440px',
		'xxl': '2560px',
	},
  	colors: {
  		'blue-primary': '#151f6d',
  		'blue-secondary': '#65AEC1',
  		'blue-light': '#7FE1FA',
  		'grey-primary': '#333f48',
  		transparent: 'transparent',
  		current: 'currentColor',
  		black: colors.black,
  		white: colors.white,
  		gray: colors.gray,
  		emerald: colors.emerald,
		indigo: colors.indigo,
		orange: colors.orange,
		dynamicBg: 'var(--dynamic-bg-color)',
  	},
  	extend: {
		boxShadow: {
			'custom': '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
			'custom-br': '15px 15px 25px -10px rgba(0,0,0,0.5)',
		  },
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		fontFamily: {
  			sans: ['Poppins', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
