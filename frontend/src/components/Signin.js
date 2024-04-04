import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CSSBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'
import ThemeManager from '../Theme.js'
import api from '..'
import React from 'react'
import instance from '../api/axiosSetup'
import authService from '../api/apiService'
import { Typography } from '@mui/material';

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.text(email);
}

class Signin extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.theme);
        this.themeManager = new ThemeManager(props.theme);
        this.themeManager.setBackground("#2d5a3e");
        this.state = {
            usernameOn: false,
            emailOn: false,
            passwordON: false,
            username: "",
            email: "",
            password: "",
            errorMessage: "",
            errorState: "",
        }
        /*
        1: Username is empty,
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
    handleChange = (event) => {
        const data = new FormData(event.currentTarget);
        let obj = {
            username: data.get('Username'),
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(obj)
        this.setState({
            username: obj.username,
            email: obj.email,
            password: obj.password,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let obj = {
            username: data.get('Username'),
            email: data.get('email'),
            password: data.get('password'),
        }
        if (!obj.username){
            this.state.errorMessage = "Required fields are missing";
            this.state.errorState = 1;
            return null;
        } else if (!obj.email){
            this.state.errorMessage = "Required fields are missing"
            this.state.errorState = 2;
        } else if (!obj.password){
            this.state.errorMessage = "Required fields are missing"
            this.state.errorState = 3;
        } else if (!obj.password.length < 6) {
            this.state.errorMessage = "Password is too weak"
            this.state.errorState = 6;
        } else if (!validateEmail(obj.email)){
            this.state.errorMessage = "Incorrect Email Format"
            this.state.errorState = 5
        }
        try {
            const response = await authService.signup(obj.email, obj.password, obj.username)
        } catch (error) {
            console.log('Sign Up Failed', error.response.data)
            if (error.response.data == "Email already exists"){
                this.state.errorState = 4;
                this.setState({ errorMessage: "Email already exists" })
            } else {
                this.state.errorState = 8;
                this.setState({ errorMessage: "Server Message" })
            }
        }
    }


    render() {
        const {errorMessage, errorState} = this.state
        return (
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
                        component="a"
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
                        Sign-Up
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
                                    required
                                    fullWidth
                                    error = {errorState == 1}
                                    id="Username"
                                    label="Username"
                                    name="Username"
                                    helperText={errorState == 1 ? 'Username cannot be empty' : ''}
                                />
                            </Grid>
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
                                    error = {errorState == 3 || errorState == 6}
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
                            sx={{ mt: 3, mb: 2, width: "60%", fontSize: 24 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Link href="#" variant="body2">
                        {"Already have an account? Log In"}
                    </Link>
                </Container>
            </ThemeProvider>
        )
    }


}

export default Signin