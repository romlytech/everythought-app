const defaultTheme = require("tailwindcss/defaultTheme");
const path = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      path.resolve(__dirname, "./node_modules/litepie-datepicker/**/*.js"),
    ],
    options: {
      safelist: [
        "transition",
        "transform",
        "ease-out",
        "ease-in",
        "duration-100",
        "duration-200",
        "duration-300",
        "duration-400",
        "duration-500",
        "duration-700",
        "opacity-0",
        "opacity-100",
        "scale-100",
        "scale-95",
        "alert-enter-active",
        "alert-enter-to",
        "alert-enter-from",
        "alert-leave-active",
        "alert-leave-to",
        "alert-leave-from",
      ],
    },
  },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),

    extend: {
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        gray: colors.blueGray,
      },
      height: {
        100: "32rem",
        108: "36rem",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      textOpacity: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
