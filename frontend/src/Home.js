import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import {authService, userService} from './api/apiService'
import { Container } from '@mui/material';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isLoggedIn: false
        }
    }


    componentDidMount = async () => {
        console.log("Home")
        let token = localStorage.getItem('token');
        console.log("token: ", token)
        if (token) {
            console.log(token)
            let verified = await authService.verify(token);
            if (verified === 'Token Verified') {
                console.log("I'm verifying")
                let response = await userService.getUserName();
                console.log(response.data.username);
                this.setState({username: response.data.username})
                this.setState({ isLoggedIn: true })
                console.log(this.state.isLoggedIn)
            } else {
                this.setState({ isLoggedIn: false })
            }
        } else {
            this.setState({ isLoggedIn: false })
        }
    }

    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Container maxWidth="100%" disableGutters={true} sx={{ m: 0, p: 0, width: "100%" }}>
                    <Navbar username={this.state.username} isLoggedIn={this.state.isLoggedIn} theme={this.props.theme}></Navbar>
                    <Body></Body>
                </Container>
            </ThemeProvider>

        );
    }
}

export default Home;
