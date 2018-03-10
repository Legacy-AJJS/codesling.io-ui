import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Sling from './components/Sling/index.jsx';
import Auth from './components/Auth/Signup.jsx';
import App from './App.jsx';

import './index.css';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
  ,document.getElementById('root'),
);
