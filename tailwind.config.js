/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "moderate-blue": "hsl(238, 40%, 52%)",
      "moderate-blue-hover": "#7678c4",
      "soft-red": "hsl(358, 79%, 66%)",
      "soft-red-hover": "#f08386",
      "light-grayish-blue": "hsl(239, 57%, 85%)",
      "pale-red": "hsl(357, 100%, 86%)",

      "dark-blue": "hsl(212, 24%, 26%)",
      "dark-blue-hover": "#5a6674",
      "grayish-blue": "hsl(211, 10%, 45%)",
      "light-gray": "hsl(223, 19%, 93%)",
      "very-light-gray": "hsl(228, 33%, 97%)",
      white: "hsl(0, 0%, 100%)",
      modal: "rgba(0,0,0,0.4)",
    },
  },
  plugins: [],
};
