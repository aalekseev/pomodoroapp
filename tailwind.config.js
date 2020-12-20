const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/*.html", "./src/*.js"],
  darkMode: false,
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: "#EFF1FA",
      darkblue: "#1E213F",
      darkestblue: "#161932",
      lightblue: "#D7E0FF",
      violet: "#D881F8",
      cyan: "#70F3F8",
      red: "#F87070",
      lightred: "rgba(248,112,112,0.2)",
    },
    extend: {
      letterSpacing: {
        tightest: "-10px",
      },
      fontFamily: {
        kumbh: ["Kumbh Sans", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
        "space-mono": ["Space Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        logo: "2rem",
        time: "6.25rem",
      },
      boxShadow: {
        light: "-50px -50px 100px 0 rgba(22, 25, 50, 0.5), 50px 50px 100px 0 rgba(215, 224, 255, 0.1)",
        lightwithinset:
          "-50px -50px 100px 0 rgba(215, 224, 255, 0.1), 50px 50px 100px 0 rgba(22, 25, 50, 0.5), inset 20px 20px 25px 0 rgba(22, 25, 50, 0.5), inset -20px -20px 25px 0 rgba(215, 224, 255, 0.1)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
      fontWeight: ["active"],
      ringWidth: ["hover"],
    },
  },
  plugins: [],
};
