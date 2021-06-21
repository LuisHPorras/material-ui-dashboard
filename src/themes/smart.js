import { createMuiTheme } from '@material-ui/core/styles';
import red from './red'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: red[900],
      main: red[500],
      light: red[100]
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default theme;