import {extendTheme} from "native-base";

export const theme = extendTheme({
    components: {
        Input: {
            baseStyle: {color:'#070707'}
        },
        Text: {
            defaultProps: { size: 'lg' },
            sizes: {
                xl: { fontSize: '64px' },
                lg: { fontSize: '32px' },
                md: { fontSize: '16px' },
                sm: { fontSize: '12px' },
            },
        }
    },
    colors: {
        primary: {
            50: '#E3F2F9',
            100: '#C5E4F3',
            200: '#A2D4EC',
            300: '#7AC1E4',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#003F5E',
        },
        amber: {
            400: '#d97706',
        },
    },
    config: {
        initialColorMode: 'dark',
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Roboto',
    },
});
