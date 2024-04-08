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
import { withStyles } from '@mui/material/styles';

const styles = {
    lighTextField: {
        '&:after': {
            borderBottom: '2px solid white', // Change the color here
        },
        '&:hover:not(.Mui-disabled):after': {
            borderBottom: '2px solid green', // Change the color here
        },
    },
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2d5a3e',
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
            open: false,
            firstButtonChosen: false,
            secondButtonChosen: false
        }
        this.themeManager = new ThemeManager(this.props.theme)
    }

    handleSubmit = (event) => {

    }

    handleClose = () => {
        this.setState({ open: false })
    }

    setFirstButton = () => {
        this.setState({ firstButtonChosen: true })
        this.setState({ secondButtonChosen: false })
    }


    setSecondButton = () => {
        this.setState({ secondButtonChosen: true })
        this.setState({ firstButtonChosen: false })
    }

    render() {
        const { openModal, handleClose } = this.props
        const classes = styles;
        this.themeManager.setPrimaryMain("#FFF")
        this.themeManager.setPrimaryDark("#BBB")
        console.log("First", this.state.firstButtonChosen)
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
                            <Box component="form" sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="name"
                                            label="What's the name of the habit?"
                                            name="name"
                                            autoComplete="name"
                                            variant="standard"
                                            className={classes.lighTextField}
                                            InputLabelProps={{
                                                style: { color: '#fff', opacity: "50%" },
                                            }}
                                            InputProps={{
                                                style: { color: "#FFF" }
                                            }}
                                            sx={{
                                                '&::after': {
                                                    borderBottomColor: "white"
                                                },
                                                input: "white", borderColor: "white", color: "white"
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            variant="standard"
                                            name="description"
                                            label="Describe the habit"
                                            id="description"
                                            InputLabelProps={{
                                                style: { color: '#fff', opacity: "50%" },
                                            }}
                                            InputProps={{
                                                style: { color: "#FFF" }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Container sx={{ mt: 4, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                                    <Button
                                        variant={this.state.firstButtonChosen ? "contained" : "outlined"}
                                        size='small'
                                        onClick={this.setFirstButton}
                                        sx={{ color: this.state.firstButtonChosen ? "#449D69" : "white", fontSize: 20, textDecoration: "none" }}
                                    >
                                        <Container sx={{ textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>Daily</Container>
                                    </Button>
                                    <Button
                                        size='small'
                                        variant={this.state.secondButtonChosen ? "contained" : "outlined"}
                                        onClick={this.setSecondButton}
                                        sx={{ fontSize: 20, textDecoration: "none" }}
                                    >
                                        <Container sx={{ color: this.state.secondButtonChosen ? "#449D69" : "white", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>Weekly</Container>
                                    </Button>
                                </Container>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "primary.light", "&:hover": {
                                        backgroundColor: "#449D69"
                                    },  mt: 3, mb: 2, width: "60%", fontSize: 24, textDecoration: "none" }}
                                >
                                    <Container sx={{ textDecoration: "none" }}>
                                        Add Habit
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