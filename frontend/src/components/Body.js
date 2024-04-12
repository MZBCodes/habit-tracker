import '../App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import theme from '../Theme.js'
import { authService, userService } from '../api/apiService.js'
import React from 'react'
import Typography from '@mui/material/Typography';
import TaskModal from './TaskModal.js'
import Container from '@mui/material/Container';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            isLoggedIn: null,
            habits: [],
            addTaskVisible: null
        }
    }

    handleOpen = () => {
        this.setState({ addTaskVisible: true })
    }
    handleClose = () => {
        this.setState({ addTaskVisible: false })
    }

    componentDidMount = async () => {
        this.props.themeManager.setPrimaryMain("#449D69")
        this.props.themeManager.setPrimaryDark("#2d5a3e")
        let token = localStorage.getItem('token');
        if (token) {
            let verified = await authService.verify(token);
            if (verified === 'Token Verified') {
                let response;
                console.log("Curren Token", token)
                try {
                    response = await userService.getHabits();
                } catch (err) {
                    console.error("Failure to get Habits", "\nToken:", token, "\nVerification Message: ", verified, "\nError: ", err)
                }
                console.log(response)
                this.setState({ habits: response })
                this.setState({ isLoggedIn: true })
            } else {
                this.setState({ isLoggedIn: false })
            }
        } else {
            this.setState({ isLoggedIn: false })
        }
    }

    render() {
        const { addTaskVisible } = this.state
        return this.state.isLoggedIn ? (
            this.state.habits.length != 0 ? (
                <div>{this.state.habits.map((x, index) => <div key={`${x.name}`}>{x.name}</div>)}</div>
            ) : (
                <Container sx={{mt: 10, display: "flex", flexDirection: "Column", alignItems:"center", justifyContent:"center"}}>
                    <Typography variant="h6" component="h4">
                        You have no tasks currently. Add more tasks.
                    </Typography>
                    <Button sx={{mt:1}}variant="outlined" onClick={this.handleOpen}>Add Tasks</Button>
                    <TaskModal theme={this.props.theme} handleClose={this.handleClose} openModal={addTaskVisible}></TaskModal>
                </Container>
            )
        ) : (
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