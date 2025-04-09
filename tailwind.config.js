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
				"dark": "#0E0D15",
				"light": "#ededed",
				"accent": "#8B5DFF",
			},
			transitionTimingFunction: {
				'custom-bezier': 'cubic-bezier(0.76, 0, 0.24, 1)',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				bounceUpDown: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
			animation: {
				bounceUpDown: 'bounceUpDown 2s ease-in-out infinite',
				fadeIn: 'fadeIn 0.3s ease-in-out',
			},
			fontFamily: {
				sora: ['var(--font-sora)', 'sans-serif'],
        		syne: ['var(--font-syne)', 'sans-serif'],
        		apercu: ['var(--font-apercu)', 'sans-serif'],
        		bebas: ['var(--font-bebas)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
