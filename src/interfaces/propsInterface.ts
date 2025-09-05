// ARCHIVO QUE CONTIENE LAS INTERFACES DE LOS PROPS DE LOS COMPONENTES

import {
  Template,
  TemplateField,
  UploadedDocument,
} from './apiResponsesInterface'
import { AssignedField } from './interactiveEditorInterface'
import { AvailableFieldMapper } from './mappersInterface'

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

export interface DocumentEditorProps {
  content: string
  placeholder?: string
  onUpdate: (content: string) => void
  onTextSelection?: (selectedText: string, from: number, to: number) => void
  editable?: boolean
}

export interface DocumentPreviewProps {
  htmlContent: string
  assignedFields: AssignedField[]
  previewData: Record<string, string>
  onPreviewDataChange: (data: Record<string, string>) => void
}

export interface FieldsManagerProps {
  availableFields: AvailableFieldMapper[]
  assignedFields: AssignedField[]
  unassignedFields: AvailableFieldMapper[]
  onCreateField: () => void
  onRemoveAssignedField: (index: number) => void
  isLoading?: boolean
}

export interface HelpGuideProps {
  isVisible?: boolean
  onToggle?: () => void
}

export interface DialogModalPreviewProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  htmlContent: string
  isLoading?: boolean
  showInteractiveEditorButton?: boolean
  onNavigateToEditor?: () => void
  type: 'template' | 'document'
}

export interface InformationSectionProps {
  type: 'template' | 'document'
  // Props para template
  templateName?: string
  setTemplateName?: (name: string) => void
  templateDescription?: string
  setTemplateDescription?: (description: string) => void
  templateType?: string
  setTemplateType?: (type: string) => void
  templateTypes?: Array<{ id: number; name: string }>
  templateCategories?: Array<{ id: number; name: string }>
  templateClassifications?: Array<{ id: number; name: string }>
  templateCategory?: string
  templateClassification?: string
  setTemplateCategory?: (category: string) => void
  setTemplateClassification?: (classification: string) => void
  onSaveTemplate?: () => void
  onResetTemplate?: () => void
  // Props para document
  documentName?: string
  setDocumentName?: (name: string) => void
  onGenerateDocument?: () => void
  onResetDocument?: () => void
  // Props comunes
  loading?: boolean
  disabled?: boolean
}

export interface UseDocumentEditorProps {
  content: string
  placeholder?: string
  onUpdate: (content: string) => void
  onTextSelection?: (selectedText: string, from: number, to: number) => void
  editable?: boolean
}

export interface UseDocumentPreviewProps {
  htmlContent: string
  assignedFields: AssignedField[]
  previewData: Record<string, string>
  onPreviewDataChange: (data: Record<string, string>) => void
}

export interface UseFieldsManagerProps {
  availableFields: AvailableFieldMapper[]
  assignedFields: AssignedField[]
  unassignedFields: AvailableFieldMapper[]
  onCreateField: () => void
  onRemoveAssignedField: (index: number) => void
  isLoading?: boolean
}

export interface UseHelpGuideProps {
  isVisible?: boolean
  onToggle?: () => void
}
