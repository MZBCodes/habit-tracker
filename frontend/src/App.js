import './App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import instance from './api/axiosSetup'
import authService from './api/apiService'

const getUsers = async () => {
  try { 
    const response = await instance.get('/auth/signin');
    console.log(response);
  } catch (error) {
    console.error("Error getting user", error);
  }
}

const signIn = async (username, password) => {
  try {
    const token = await authService.login(username, password);
  } catch {
  }
}
const theme = createTheme({
  palette: {
    primary: {
      light: '#a4d4b7',
      main: '#449D69',
      dark: '#2d5a3e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e69ecb',
      main: '#9d4478',
      dark: '#753c65',
      contrastText: '#000',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

class App extends React.Component {
  
  componentDidMount = () => {
    getUsers();
    signIn("test2@habits.com", "password")
  }
  render() {
    return (
      <div>
        <Navbar />
        <Body />
      </div>

    );
  }
}

export default App;
