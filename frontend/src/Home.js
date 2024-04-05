import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import instance from './api/axiosSetup'
import { Container } from '@mui/material';



class Home extends React.Component {
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
        <ThemeProvider theme={this.props.theme}>
          <Container maxWidth="100%" disableGutters={true} sx={{m:0, p:0, width:"100%"}}>
            <Navbar isLoggedIn={this.state.isLoggedIn} theme={this.props.theme}></Navbar>
            <Body></Body>
          </Container>
        </ThemeProvider>

    );
  }
}

export default Home;
