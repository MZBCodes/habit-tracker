import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {authService} from '../api/apiService.js'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeManager from '../Theme.js'
import React from 'react'

let pages = ['Sign In', 'Sign Up']
let links = ['/login', 'register']

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.themeManager = new ThemeManager(props.theme)
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            isLoggedIn: this.props.isLoggedIn,
            username: this.props.username
        }
    }

    componentDidMount = async () => {
        console.log("Navbar")
        let token = localStorage.getItem('token');
        if (token) {
            console.log(token)
            let verified = await authService.verify(token);
            console.log(verified)
            if (verified === 'Token Verified') {
                console.log("I'm verifying")
                this.setState({ isLoggedIn: true })
                console.log(this.state.isLoggedIn)
            } else {
                this.setState({ isLoggedIn: false })
            }
        } else {
            this.setState({ isLoggedIn: false })
        }
    }

    handleOpenNavMenu = (event) => {
        this.setState({ anchorElNav: event.currentTarget });
    };

    handleOpenUserMenu = (event) => {
        this.setState({ anchorElUser: event.currentTarget });
    };

    handleCloseNavMenu = () => {
        this.setState({ anchorElNav: null });
    };

    handleCloseUserMenu = () => {
        this.setState({ anchorElUser: null });
    };

    render() {
        const { anchorElNav, anchorElUser } = this.state;
        return (
            <ThemeProvider theme={this.themeManager.theme}>
                <AppBar sx={{ m: 0, }} position="static" color="primary">
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Typography
                            variant="h6"
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Habit.io
                        </Typography>
                        {!this.state.isLoggedIn ?
                            (
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        {pages.map((page) => (
                                            <Button
                                                key={page}
                                                sx={{ my: 2, color: 'white', display: 'block', borderColor: "white", marginLeft: 2 }}
                                                variant='outlined'
                                                component={Link}
                                                to={page == 'Sign In' ? '/login' : '/register'}
                                                >
                                                {page}
                                            </Button>
                                        ))}
                                    </Box>
                            ) : (<Typography
                                variant="h6"
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
                                }}
                            >{this.state.username}</Typography>
                            )}
                    </Container>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default Navbar