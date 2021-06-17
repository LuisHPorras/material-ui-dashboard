import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Dashboard  from "./components/Dashboard";
import theme from "./themes/smart";

function App() {
  return (  
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
