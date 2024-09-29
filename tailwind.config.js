/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"accent": "#FF885B",
			},
			transitionTimingFunction: {
				'custom-bezier': 'cubic-bezier(0.76, 0, 0.24, 1)',
			},
		},
	},
	plugins: [],
};
