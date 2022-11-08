import renderer from 'react-test-renderer';
import LogIn from './LogIn.js';
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme } from 'src/theme'
import { THEMES } from 'src/constants'
import { ThemeProvider } from '@mui/material'
import {cleanup, fireEvent, render} from '@testing-library/react';

const theme = createTheme({
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: THEMES.LIGHT,
})


it('__SHOW_LINK__', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Router>
        <LogIn></LogIn> 
      </Router>
    </ThemeProvider>,
  );

  expect(getByText('Sign Up.')).toBeTruthy();
});