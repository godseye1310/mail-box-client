/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "475px",
			},
			height: {
				"calc-dvh": "calc(100dvh - 57px)",
			},
		},
	},
	plugins: [],
};
