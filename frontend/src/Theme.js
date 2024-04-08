import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class ThemeManager {
    constructor(theme) {
        this.theme = Object.assign({}, theme);
    }

    setPrimaryColor(identifier, color) {
        this.theme.palette.primary[identifier] = color
    }
    setSecondaryColor(identifier, color) {
        this.theme.palette.secondary[identifier] = color
    }
    setBackgroundColor(identifier, color) {
        this.theme.palette.background[identifier] = color
    }

    setBackground(color) {
        this.theme.palette.background.default = color;
    }

    setPrimaryMain(color) {
        this.theme.palette.primary.main = color
    }

    setPrimaryDark(color) {
        this.theme.palette.primary.dark = color
    }
}


export default ThemeManager