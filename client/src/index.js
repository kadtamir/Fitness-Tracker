import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@material-ui/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#73DFD0',
      default: '#eafaf8',
    },
  },
  typography: {
    fontFamily: "'Source Sans Pro','Helvetica', 'Arial', sans-serif",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
