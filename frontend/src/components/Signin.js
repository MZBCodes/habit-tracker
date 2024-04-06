import '../App.css';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import CSSBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link as RouterLink, redirect, Navigate } from 'react-router-dom'
import ThemeManager from '../Theme.js'
import React from 'react'
import authService from '../api/apiService'
import { Typography } from '@mui/material';

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.text(email);
}



class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.themeManager = new ThemeManager(props.theme);
        this.themeManager.setBackground("#2d5a3e");
        this.state = {
            emailOn: false,
            passwordON: false,
            email: "",
            password: "",
            errorMessage: "",
            errorState: "",
            tokenRecieved: false,
            isLoggedIn: true
        }
        /*
        2: Email is empty
        3: Password is empty
        4: Email is already in use
        5: Invalid email format 
        6: Password is too short
        7: Network Error
        8: Server Error
        */
    }

    componentDidMount() {
    }

    removeLocalStorageItem = () => {
        localStorage.removeItem('token')
        console.log("removed")
    }

    handleChange = (event) => {
        const data = new FormData(event.currentTarget);
        let obj = {
            email: data.get('email'),
            password: data.get('password'),
        }
        this.setState({
            email: obj.email,
            password: obj.password,
        });
    };

    handleSubmit = async (event) => {
        console.log("Hello")
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let obj = {
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(obj)
        // if (!obj.email) {
        //     this.setState({ errorMessage: "Required fields are missing" })
        //     this.setState({ errorState: 2 })
        // } else if (!obj.password) {
        //     this.setState({ errorMessage: "Required fields are missing" })
        //     this.setState({ errorState: 3 })
        // } else if (!obj.password.length < 6) {
        //     this.setState({ errorMessage: "Password is too weak" })
        //     this.setState({ errorState: 6 })
        // } else if (!validateEmail(obj.email)) {
        //     this.setState({ errorMessage: "Incorrect Email Format" })
        //     this.setState({ errorState: 7 })
        // } else {
        try {
            const stuff = await authService.login(obj.email, obj.password)
            if (stuff) {
                console.log(localStorage.getItem('token'))
                this.setState({ isLoggedIn: true })
                this.setState({ tokenRecieved: true })
                this.setState({ errorState: 0 })
                this.setState({ errorMessage: "" })
            }
        } catch (error) {
            console.error('Log In Failed', error)
            this.setState({ errorState: 8 })
            this.setState({ errorMessage: "Server Message" })
        }
    }

    redirectHomePage() {
        return redirect("/")
    }


    render() {
        const { errorMessage, errorState } = this.state;

        return this.state.tokenRecieved ? (
            <Navigate replace to="/"></Navigate>) : (

            <ThemeProvider theme={this.themeManager.theme}>
                <CSSBaseline />
                <Container maxWidth="sm" sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                    width: "100%",
                    height: "100%",
                    backgroudnColor: "green"
                }}>
                    <Typography
                        variant="h2"
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}

                    >
                        Habit.io
                    </Typography><Typography
                        component="h6"
                        onClick={this.removeLocalStorageItem}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Monda',
                            fontSize: "16px",
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            opacity: "50%",
                            textDecoration: 'none',
                        }}
                    >
                        Sign-In
                    </Typography>
                </Container>
                <Container sx={{
                    backgroundColor: "white",
                    width: "50%",
                    padding: "1rem",
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column", alignItems: "center", justifyContent: "center"
                }}>
                    <Box component="form" onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={errorState == 2 || errorState == 4 || errorState == 5}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={errorState == 2 ? 'Email cannot be empty' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={errorState == 3 || errorState == 6}
                                />
                            </Grid>
                            {errorMessage && (
                                <Box mt={2} ml={2} color="#d32f2f" >
                                    {errorMessage}
                                </Box>
                            )}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember Me"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "60%", fontSize: 24, textDecoration: "none" }}
                        >
                                <Container sx={{ textDecoration: "none" }}>
                                    Log In
                                </Container>
                        </Button>
                    </Box>
                    <RouterLink to="/register" variant="body2">
                        {"Don't have an account? Register here"}
                    </RouterLink>
                </Container>
            </ThemeProvider>
        )
    }


}

export default Signup