import { styled } from '@mui/material/styles'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import Menu, { MenuProps } from '@mui/material/Menu'
import { Container, Card } from '@mui/material'
import { paletteColors } from '../../utils/paletteColors'
import TableCell from '@mui/material/TableCell'
import { tableCellClasses } from '@mui/material/TableCell'

// Shared style objects - Use theme for better maintainability
const centeredStyleObj = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// Styled components - Improved with responsive design
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(2),
  ...centeredStyleObj,
  // Add responsive padding
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}))

const StyledCard = styled(Card)(({ theme }) => ({
  flexDirection: 'column',
  minHeight: 'calc(100vh - 40.125rem)',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  backdropFilter: 'blur(15px)',
  backgroundColor: `${paletteColors.colorGray} !important`,
  borderRadius: theme.spacing(2.5),
  boxShadow: `10px 10px 20px #9d9d9d, -10px -10px 20px ${paletteColors.colorWhite}`,
  ...centeredStyleObj,
}))

// NavBar with improved styling
const NavBarApp = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: paletteColors.colorSecondary,
  height: 64,
  boxShadow: `0 2px 8px ${paletteColors.colorGray}`,
  '& .MuiToolbar-root': {
    minHeight: 64,
    padding: theme.spacing(0, 2),
  },
}))

// Menu components with better organization
const BaseMenuStyles = {
  '& .MuiPaper-root': {
    top: '64px !important',
    height: '100vh',
    maxHeight: '100vh',
    borderRadius: '0 !important',
    width: '250px !important',
    '& .MuiList-root': {
      padding: '0 !important',
    },
    '& .MuiMenuItem-root': {
      padding: '12px 16px',
      '&:hover': {
        backgroundColor: 'rgba(15, 118, 110, 0.08)',
      },
    },
    '& .log-in': {
      '&:hover': { backgroundColor: paletteColors.colorPrimary },
      backgroundColor: paletteColors.colorPrimary,
      color: paletteColors.colorWhite,
    },
    '& .log-out': {
      '&:hover': { backgroundColor: paletteColors.colorError },
      backgroundColor: paletteColors.colorError,
      color: paletteColors.colorWhite,
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(15, 118, 110, 0.08)',
  },
}

const MenuItems = styled(Menu)<MenuProps>({
  ...BaseMenuStyles,
  '& .MuiPaper-root': {
    ...BaseMenuStyles['& .MuiPaper-root'],
    left: 'unset !important',
  },
})

const MenuItemsProfile = styled(Menu)<MenuProps>({
  ...BaseMenuStyles,
  '& .MuiPaper-root': {
    ...BaseMenuStyles['& .MuiPaper-root'],
    right: '0 !important',
    left: 'unset !important',
    '& .MuiMenuItem-root': {
      ...BaseMenuStyles['& .MuiPaper-root']['& .MuiMenuItem-root'],
      justifyContent: 'flex-end !important',
    },
  },
})

const TableHeadCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: paletteColors.colorPrimary,
    color: paletteColors.colorWhite,
    fontWeight: 'bold',
  },
}))

export {
  MenuItems,
  MenuItemsProfile,
  NavBarApp,
  StyledContainer,
  StyledCard,
  TableHeadCell,
}
