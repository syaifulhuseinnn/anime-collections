export type ThemeTypes = {
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
    primary: string;
    pink: string;
    light_pink: string;
    black: string;
    white: string;
  };
};

const theme: ThemeTypes = {
  fonts: {
    heading: `"Bebas Neue", cursive`,
    body: `"Questrial", sans-serif`,
  },
  colors: {
    primary: "#f73d93",
    pink: "#f73d93",
    light_pink: "#f473b9",
    black: "#000000",
    white: "#ffffff",
  },
};

export default theme;
