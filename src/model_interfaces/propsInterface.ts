// Box Container App
export interface BoxContainerAppProps {
  children: any
}

// Container App
export interface ContainerAppProps {
  children: any
}

// Components props
export interface DialogModalProps {
  dialogModalActions: any
  dialogModalContent: any
  dialogModalContentText: any
  dialogModalTitle: any
  handleClose: any
  open: boolean
}

// Footer props
export interface FooterProps {
  date: number
}

// Left Side Menu props
export interface LeftSideMenuProps {
  drawerOpen?: boolean
}

// Header props
export interface HeaderProps {
  onDrawerToggle?: () => void
  drawerOpen?: boolean
}