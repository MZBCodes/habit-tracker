import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            light: '#a4d4b7',
            main: '#449D69',
            dark: '#2d5a3e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e69ecb',
            main: '#9d4478',
            dark: '#753c65',
            contrastText: '#000',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
        },
    },
});

export default theme