import './App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import instance from './api/axiosSetup'
import authService from './api/apiService'
import SignIn from './components/Signin'
import { Container } from '@mui/material';

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


  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider>
          <Container>
            <Navbar isLoggedIn={this.state.isLoggedIn}></Navbar>
            <Body></Body>
          </Container>
        </ThemeProvider>
      </div>

    );
  }
}

export default App;
