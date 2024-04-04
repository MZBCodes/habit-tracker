import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class ThemeManager {
    constructor(theme) {
        this.theme = theme;
    }

    setBackground(color) {
        this.theme.palette.background.default = color;
    }
}


export default ThemeManager