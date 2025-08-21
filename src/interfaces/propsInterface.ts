// ARCHIVO QUE CONTIENE LAS INTERFACES DE LOS PROPS DE LOS COMPONENTES

import {
  Template,
  TemplateField,
  UploadedDocument,
} from './apiResponsesInterface'

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
  disabled: boolean
}

// Document Upload
export interface UploadedFile {
  preview?: string
  status?: 'uploading' | 'success' | 'error'
  id?: string
  responseId?: number
  file?: File
  name?: string
  size?: number
  type?: string
  fields?: TemplateField[]
}

// Html Preview Props
export interface HtmlPreviewProps {
  htmlContent: string
  fileName?: string
  onClose?: () => void
}

// Template Card Props
export interface TemplateCardProps {
  template: Template
  onEdit?: (template: Template) => void
  onDelete?: (templateId: string) => void
  onDownload?: (template: Template) => void
  onPreview?: (template: Template) => void
  onToggleFavorite?: (templateId: number) => void
}

export interface DocumentUploadProps {
  document: UploadedDocument
  onPreview: (document: UploadedDocument) => void
  onDelete: (documentId: number) => void
}
