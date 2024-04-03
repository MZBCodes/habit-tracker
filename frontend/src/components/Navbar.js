import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import theme from '../Theme.js'
import React from 'react'

const pages = ['Sign-In', 'Sign-Out']

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            anchorElUser: null
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
                    <Container className="nav-container">
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
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                variant='outlined'
                            >
                                {page}
                            </Button>
                        ))}
                        </Box>
                    </Container>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default Navbar