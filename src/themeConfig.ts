export const colors = {
  primary: '#3448c5',
  secondary: '#ff5050',
  bodyBackground: '#1e1e1e',
};

export const theme = {
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: colors.bodyBackground,
        },
      },
    },
  },
};
