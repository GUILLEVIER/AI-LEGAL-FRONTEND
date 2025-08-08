// Theme configuration separated for better maintainability
import { createTheme } from '@mui/material/styles'
import { paletteColors } from '../../utils/paletteColors'

// Theme configuration - Improved with breakpoints and typography variants
export const theme = createTheme({
  typography: {
    fontFamily: ['Play', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: paletteColors.colorPrimary,
      light: paletteColors.colorPrimaryLight,
      dark: paletteColors.colorPrimaryDark,
    },
    secondary: {
      main: paletteColors.colorSecondary,
      light: paletteColors.colorSecondaryLight,
      dark: paletteColors.colorSecondaryDark,
    },
    success: {
      main: paletteColors.colorSuccess,
    },
    error: {
      main: paletteColors.colorError,
    },
    warning: {
      main: paletteColors.colorWarning,
    },
    info: {
      main: paletteColors.colorInfo,
    },
    background: {
      default: paletteColors.colorSurface,
      paper: paletteColors.colorBackground,
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
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
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
                backgroundColor: paletteColors.colorPrimary,
                boxShadow: theme.shadows[4],
              },
            }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'secondary' && {
              '&:hover': {
                backgroundColor: paletteColors.colorSecondary,
                boxShadow: theme.shadows[4],
              },
            }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'error' && {
              backgroundColor: paletteColors.colorError,
              '&:hover': {
                backgroundColor: paletteColors.colorError,
                boxShadow: theme.shadows[4],
              },
            }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'warning' && {
              backgroundColor: paletteColors.colorWarning,
              color: paletteColors.colorWhite,
              '&:hover': {
                backgroundColor: paletteColors.colorWarning,
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
