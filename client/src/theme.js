import { createMuiTheme } from '../node_modules/@material-ui/core'

export const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Share Tech Mono', 'Cuprum'].join(',')
  },
  palette: {
    primary: {
      main: '#26a69a'
    },
    secondary: {
      main: '#ffa726'
    },
    error: {
      main: '#ef5350'
    },
    white: {
      main: '#fff'
    }
  },
  spacing: {
    unit: 8,
    unit2: 40
  },
  something: {
    name: 'theme something prop'
  }
})
