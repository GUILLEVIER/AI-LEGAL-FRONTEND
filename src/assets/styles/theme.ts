// Theme configuration separated for better maintainability
import { createTheme } from '@mui/material/styles'
import { PaletteColors } from '../../utils/PaletteColors'

// Theme configuration - Improved with breakpoints and typography variants
export const theme = createTheme({
  typography: {
    fontFamily: ['Play', 'sans-serif'].join(','),
    // Add more typography variants for better consistency
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: PaletteColors.colorPrimary,
      light: PaletteColors.colorPrimaryLight,
      dark: PaletteColors.colorPrimaryDark,
    },
    secondary: {
      main: PaletteColors.colorSecondary,
      light: PaletteColors.colorSecondaryLight,
      dark: PaletteColors.colorSecondaryDark,
    },
    success: {
      main: PaletteColors.colorSuccess,
    },
    error: {
      main: PaletteColors.colorError,
    },
    warning: {
      main: PaletteColors.colorWarning,
    },
    info: {
      main: PaletteColors.colorInfo,
    },
    background: {
      default: PaletteColors.colorSurface,
      paper: PaletteColors.colorBackground,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: theme.spacing(1.25),
          padding: theme.spacing(1.25, 2),
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            {
              duration: theme.transitions.duration.short,
            }
          ),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
            '&:hover': {
              backgroundColor: PaletteColors.colorPrimary,
              boxShadow: theme.shadows[4],
            },
          }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'secondary' && {
            '&:hover': {
              backgroundColor: PaletteColors.colorSecondary,
              boxShadow: theme.shadows[4],
            },
          }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'error' && {
            backgroundColor: PaletteColors.colorError,
            '&:hover': {
              backgroundColor: PaletteColors.colorError,
              boxShadow: theme.shadows[4],
            },
          }),
          ...(ownerState.variant === 'text' && {
            '&:hover': { background: 'transparent' },
          }),
        }),
      },
    },
  },
})
