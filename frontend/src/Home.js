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
        let token = localStorage.getItem('token');
        if (token) {
            let verified = await authService.verify(token);
            if (verified === 'Token Verified') {
                let response = await userService.getUserName();
                console.log(response)
                this.setState({username: response})
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
