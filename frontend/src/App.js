import './App.css';
import Button from '@mui/material/Button';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import instance from './api/axiosSetup'
import {authService} from './api/apiService'
import Signin from './components/Signin'
import Home from './Home'
import { Container } from '@mui/material';
import Signup from './components/Signup';

const getUsers = async () => {
  try {
    const response = await instance.get('/user/getusers');
    // console.log(response);
  } catch (error) {
    console.error("Error getting user", error);
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
    error: {
      main: '#d32f2f'
    }
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
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }


  componentDidMount = async () => {
    let token = localStorage.getItem('token');
    if (false) {
        let verified = await authService.verify(token);
        if (verified === 'Token Verified') {
            this.setState({ isLoggedIn: true })
        } else {
            this.setState({ isLoggedIn: false })
        }
    } else {
        this.setState({ isLoggedIn: false })
    }
  }
  
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home theme={theme}/>} />
          <Route path="/register" element={<Signup theme={theme}/>} />
          <Route path="/login" element={<Signin theme={theme}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
