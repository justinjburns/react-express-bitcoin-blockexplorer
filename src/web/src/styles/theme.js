import { createMuiTheme }  from '@material-ui/core/styles';
import { palette } from './palette';

const theme = createMuiTheme({
    palette,
    typography: {
        useNextVariants: true,
        icons: {
            default: 30
        }
    },
    overrides: {
        
    }
});

export default theme;