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

// Login
export interface LoginFormInterface {
  email: string
  password: string
  remember: boolean
  showPassword: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  type: 'item' | 'group'
  children?: MenuItem[]
}

export interface LeftSideMenuProps {
  drawerOpen?: boolean
}

export interface UserProfile {
  name: string
  role: string
  email?: string
  avatar?: string
}

export interface HeaderProps {
  onDrawerToggle?: () => void
  drawerOpen?: boolean
}