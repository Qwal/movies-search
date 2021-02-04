import React from 'react';
import { Provider } from 'react-redux';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme, // fix: https://github.com/mui-org/material-ui/issues/13394
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { store } from './store';
import { theme } from './themeConfig';
import { HomePage } from './pages/HomePage';

const themeConfig = createMuiTheme(theme);

const App = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        <Provider store={store}>
          <HomePage />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
