import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import theme from '../Theme.js'
import {authService, userService} from '../api/apiService.js'
import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            isLoggedIn: null,
            habits: null
        }
    }

    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        if (token) {
            let verified = await authService.verify(token);
            if (verified === 'Token Verified') {
                let response = await userService.getHabits();
                console.log(response)
                this.setState({ habits: response})
                this.setState({ isLoggedIn: true })
            } else {
                this.setState({ isLoggedIn: false })
            }
        } else {
            this.setState({ isLoggedIn: false })
        }
    }

    render() {
        return this.state.isLoggedIn ? (<div>{this.state.habits.map((x, index) => <div key={`${x.name}`}>{x.name}</div>)}</div>) : (
            <Typography
                variant="h4"
                component="h4"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: 'Monda',
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    marginTop: 10
                }}
            >
                Sign In to view your other tasks
            </Typography>
        )
    }
}

export default Body