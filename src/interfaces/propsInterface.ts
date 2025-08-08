// Box Container App
export interface BoxContainerAppProps {
  children: any
}

// Container App
export interface ContainerAppProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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

// Dialog Modal Confirm Delete props
export interface DialogModalConfirmDeleteProps {
  handleClose: any
  handleConfirm: any
  open: any
}

// Document Upload
export interface UploadedFile extends File {
  preview?: string
  status?: 'uploading' | 'success' | 'error'
  id?: string
}

export interface DocumentUploadProps {
  onFilesUploaded?: (files: File[]) => void
  acceptedFileTypes?: string[]
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
}
