import { createTheme, responsiveFontSizes } from '@mui/material';
import { colors, fonts, RADIUS } from './colors';
import { lightPage } from './textures';

const sans = fonts.sans;
const hardShadow = (color: string = colors.ink, size = 4) => `${size}px ${size}px 0 ${color}`;

let theme = createTheme({
  palette: {
    primary: {
      main: colors.pink,
      light: colors.lightPink,
      dark: colors.darkPink,
      contrastText: colors.ink,
    },
    secondary: {
      main: colors.ink,
      light: colors.inkMuted,
      dark: colors.black,
      contrastText: colors.cream,
    },
    background: {
      default: colors.page,
      paper: colors.paper,
    },
    text: {
      primary: colors.ink,
      secondary: colors.inkMuted,
    },
    divider: 'rgba(30, 26, 28, 0.18)',
    info: {
      main: colors.ink,
      light: colors.inkMuted,
      dark: colors.black,
      contrastText: colors.cream,
    },
  },
  shape: {
    borderRadius: RADIUS,
  },
  typography: {
    fontFamily: sans,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.05,
      color: colors.ink,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
      color: colors.ink,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.18,
      color: colors.ink,
    },
    h4: {
      fontSize: '1.55rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: colors.ink,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 700,
      letterSpacing: '-0.005em',
      color: colors.ink,
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: colors.ink,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.55,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
    overline: {
      letterSpacing: '0.18em',
      fontWeight: 700,
      fontSize: '0.72rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...lightPage,
          color: colors.ink,
        },
        a: {
          color: 'inherit',
        },
        '::selection': {
          backgroundColor: colors.pink,
          color: colors.ink,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.page,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 20px',
          fontSize: '0.95rem',
          transition: 'transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
        },
        contained: {
          border: `2px solid ${colors.ink}`,
          boxShadow: hardShadow(colors.ink, 3),
          '&:hover': {
            boxShadow: hardShadow(colors.ink, 5),
            transform: 'translate(-2px, -2px)',
          },
          '&:active': {
            boxShadow: hardShadow(colors.ink, 1),
            transform: 'translate(2px, 2px)',
          },
        },
        containedPrimary: {
          backgroundColor: colors.pink,
          color: colors.ink,
          '&:hover': {
            backgroundColor: colors.pink,
          },
        },
        containedSecondary: {
          backgroundColor: colors.ink,
          color: colors.cream,
          '&:hover': {
            backgroundColor: colors.black,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: colors.ink,
          color: colors.ink,
          '&:hover': {
            borderWidth: 2,
            borderColor: colors.ink,
            backgroundColor: 'rgba(30, 26, 28, 0.06)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(30, 26, 28, 0.06)',
          },
        },
        sizeLarge: {
          padding: '12px 26px',
          fontSize: '1rem',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
      styleOverrides: {
        root: {
          textDecorationColor: colors.pink,
          textDecorationThickness: 2,
          textUnderlineOffset: 3,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: `1.5px solid ${colors.ink}`,
          backgroundImage: 'none',
          backgroundColor: colors.paper,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
        },
        elevation1: {
          boxShadow: 'none',
          border: `1.5px solid ${colors.ink}`,
        },
        elevation2: {
          boxShadow: 'none',
          border: `1.5px solid ${colors.ink}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 700,
          letterSpacing: '0.06em',
          border: `1.5px solid ${colors.ink}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: `2px solid ${colors.ink}`,
          boxShadow: hardShadow(colors.ink, 6),
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
          '&:before': { display: 'none' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
