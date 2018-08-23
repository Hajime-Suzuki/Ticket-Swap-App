import './index.css'

import { BrowserRouter, Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import history from './lib/history'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { theme } from './theme'
import { MuiThemeProvider } from '@material-ui/core'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
