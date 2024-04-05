import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '../Theme.js'
import React from 'react'

let pages = ['Sign In', 'Sign Up']

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            anchorElUser: null
        }
        if (this.props.isLoggedIn) {

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
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="primary">
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
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        ) : ({

                        })
                        }
                    </Container>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default Navbar