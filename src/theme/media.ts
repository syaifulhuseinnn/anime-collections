const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const mediaQuery = (width: number, minMax: string) =>
  `@media (${minMax}-width: ${width}px)`;

const media = {
  min: {
    small: mediaQuery(breakpoints.sm, "min"),
    medium: mediaQuery(breakpoints.md, "min"),
    large: mediaQuery(breakpoints.lg, "min"),
    extra_large: mediaQuery(breakpoints.xl, "min"),
    extra_extra_large: mediaQuery(breakpoints.xxl, "min"),
  },
};

export default media;
