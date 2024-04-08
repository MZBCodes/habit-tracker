import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import themeManager from '../Theme.js'
import { authService, userService } from '../api/apiService.js'
import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeManager from '../Theme.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'primary.dark',
    color: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column"
};

class TaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.themeManager = new ThemeManager(this.props.theme)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { openModal, handleClose } = this.props
        console.log(this.props.theme)
        return (
            <ThemeProvider theme={this.themeManager.theme}>

                <Modal open={openModal} onClose={handleClose}>
                    <Box sx={style}>
                        <Container sx={{ display: "flex", justifyContent: "center", aligntItems: "center" }}>
                            <Typography
                                component="h5"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Monda',
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    opacity: "100%",
                                    textDecoration: 'none',
                                }}>
                                Add Task
                            </Typography>

                        </Container>

                        <Divider orientation="horizontal" flexItem sx={{ mt: 1, opacity: 0.6, borderColor: "#FFF" }} />
                        <Container>
                            <Box component="form">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            label="What's the name of the habit?"
                                            name="name"
                                            autoComplete="name"
                                            variant="standard"
                                            color="#FFF"
                                            InputLabelProps={{
                                                style: { color: '#fff' },
                                              }}
                                            sx={{borderColor: "white",  color: "white"}}
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
                                        />
                                    </Grid>
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

                        </Container>
                    </Box>
                </Modal>
            </ThemeProvider>
        )
    }

}

export default TaskModal