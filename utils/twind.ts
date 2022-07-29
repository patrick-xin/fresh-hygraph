import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, apply } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "strict",
  theme: {
    extend: {
      colors: {
        text: "#CB9F8E",
        smoky: "#252C2C",
        background: "#ECEAE7",
        //smoky: "#0B0A07",
        "sky-blue": "#EDFAFF",
      },
      zIndex: {
        "-10": "-10",
        "25": "25",
        "50": "50",
        "75": "75",
        "100": "100",
        "200": "200",
      },
      fontFamily: {
        body: ["'Quattrocento', serif"],
        heading: ["'Oswald', sans-serif"],
      },
    },
  },
  preflight: {
    body: apply("text-gray-800 font-body"),
    p: apply("lg:text-lg xl:text-xl lg:leading-8 font-body"),
    h1: apply("font-heading"),
    h2: apply("font-heading"),
    h3: apply("font-heading"),
    "@import": `url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Quattrocento:wght@400;700&display=swap')`,
  },
  plugins: {
    btn: `
      py-2 px-4
      font-semibold
      rounded-lg shadow-md
      focus:(outline-none ring(2 indigo-400 opacity-75))
   `,
    "btn-indigo": `btn bg-indigo(500 hover:700) text-white`,
    "btn-black": `btn bg-smoky text-gray-100 hover:bg-gray-900 py-4 px-6`,
    link: `
      hover:underline decoration-yellow-300	text-xs md:text-sm
      focus:(outline-none ring(2 text opacity-75))`,
    "link-title": `
      text-xl md:text-2xl`,
  },
};
if (IS_BROWSER) setup(config);
