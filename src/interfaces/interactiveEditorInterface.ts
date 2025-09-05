import { AvailableFieldMapper, TemplateTypeMapper } from './mappersInterface'

// Types for the Interactive Editor functionality
export interface AssignedField {
  fieldId: number
  variableName: string
  selectedText: string
}

export interface TemplateData {
  id?: number
  name: string
  description: string
  htmlWithFields: string
  assignedFields: AssignedField[]
}

export interface EditorModalState {
  isFieldModalOpen: boolean
  isAssignModalOpen: boolean
  selectedText: string
}

export interface EditorFormState {
  newFieldName: string
  newFieldType: 'texto' | 'fecha' | 'numero'
  selectedFieldId: number | null
  variableName: string
}

export interface EditorActions {
  handleCreateField: () => Promise<void>
  handleAssignField: () => void
  handleRemoveAssignedField: (index: number) => void
  handleSaveTemplate: () => Promise<void>
  resetForm: () => void
  generatePreviewHtml: () => string
}

export interface UseInteractiveEditorReturn {
  // Template state
  templateName: string
  setTemplateName: (name: string) => void
  templateDescription: string
  setTemplateDescription: (description: string) => void
  htmlContent: string
  setHtmlContent: (content: string) => void
  templateType: string
  setTemplateType: (type: string) => void
  templateTypes: TemplateTypeMapper[]

  // Fields state
  availableFields: AvailableFieldMapper[]
  setAvailableFields: (fields: AvailableFieldMapper[]) => void
  assignedFields: AssignedField[]
  setAssignedFields: (fields: AssignedField[]) => void
  unassignedFields: AvailableFieldMapper[]

  // Modal state
  isFieldModalOpen: boolean
  setIsFieldModalOpen: (open: boolean) => void
  isAssignModalOpen: boolean
  setIsAssignModalOpen: (open: boolean) => void
  selectedText: string
  setSelectedText: (text: string) => void

  // Form state
  newFieldName: string
  setNewFieldName: (name: string) => void
  newFieldType: 'texto' | 'fecha' | 'numero'
  setNewFieldType: (type: 'texto' | 'fecha' | 'numero') => void
  selectedFieldId: number | null
  setSelectedFieldId: (id: number | null) => void
  variableName: string
  setVariableName: (name: string) => void

  // Loading state
  loading: boolean
  setLoading: (loading: boolean) => void

  // Preview data
  previewData: Record<string, string>
  setPreviewData: (data: Record<string, string>) => void

  // Actions
  handleCreateField: () => Promise<void>
  handleAssignField: () => void
  handleRemoveAssignedField: (index: number) => void
  handleSaveTemplate: () => Promise<void>
  resetForm: () => void
  generatePreviewHtml: () => string
  handleTextSelection: (text: string, from: number, to: number) => void
  handleCloseAssignModal: () => void
  handleConfirmAssignment: () => void
  handleCloseFieldModal: () => void
  handleConfirmFieldCreation: () => void
}
