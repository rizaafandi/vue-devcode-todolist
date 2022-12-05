/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
      colors: {
        primary: "rgba(22, 171, 248, 1)",
        secondary: "rgba(136, 136, 136, 1)",
        original: "#F4F4F4",
        red: "rgba(237, 76, 92, 1)",
        orange: "rgba(248, 165, 65, 1)",
        green: "rgba(0, 167, 144, 1)",
        blue: "rgba(66, 139, 193, 1)",
        purple: "rgba(137, 66, 193, 1)",
        gray: "rgba(229, 229, 229, 1)",
        grey: "rgba(244, 244, 244, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
