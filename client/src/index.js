import { MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom'
import App from './App'
import './index.css'
import history from './lib/history'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { theme } from './theme'

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
