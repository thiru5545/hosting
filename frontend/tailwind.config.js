/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
                gray: {
					100: '#FFFAE5',
					300: '#FDE68A',
					400: '#EAB308',
					500: '#D97706',
					600: '#B45309',
					700: '#92400E',
					// 800: '#78350F',
                    800: '#2A2A2A', // Custom gray
                    900: '#1E1E1E', // Custom dark gray
                },
                emerald: {
					300: '#FDE68A',
                    400: '#FFD700',
                    500: '#FFC700',
                    600: '#FFB000',
                    700: '#E5A000',
                    800: '#CC9000',
                },
				white: '#fef08a',
				black: '#78350f',
            },
		},
	},
	plugins: [],
};
