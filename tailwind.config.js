/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    // Configuring the colors to be used in the project
    colors: {
      back: "#19272C",
      fontcolor: "#829395",
      errorColor: "#f87171",
      buttonBlueColor: "#0D6EFD",
      buttonText: "#ffffff",
      borderColorInputBox: "#CCC"
    }
  },
  plugins: [],
}