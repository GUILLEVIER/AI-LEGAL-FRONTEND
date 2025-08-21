import { useState, useCallback, useEffect } from 'react'
import {
  AssignedField,
  VALIDATION_RULES,
  UseInteractiveEditorReturn,
} from '../../interfaces/interactiveEditorInterface'
import { useDocumentsApi } from '../api/apiWithAuth/useDocumentsApi'
import {
  AvailableFieldMapper,
  TemplateTypeMapper,
} from '../../interfaces/mappersInterface'
import { ErrorHandler } from '../../utils/ErrorHandler'
import {
  showToastifySuccess,
  showToastifyError,
} from '../../utils/showToastify'
import { AppError } from '../../interfaces/configInterface'
import { useSelector } from 'react-redux'
import { PreviewDocumentState } from '../../legal'
import { previewDocumentResult } from '../../redux/selectors'
import { UploadedFile } from '../../interfaces/propsInterface'

/**
 * Custom hook for managing interactive editor state and logic
 * Handles template creation, field assignment, and document editing
 */
export const useInteractiveEditor = (): UseInteractiveEditorReturn => {
  // HOOKS
  const {
    isLoading,
    error,
    getAvailableFields,
    getTemplateTypes,
    createAvailableField,
    createTemplate,
  } = useDocumentsApi()
  // Template state
  const [templateName, setTemplateName] = useState<string>('')
  const [templateDescription, setTemplateDescription] = useState<string>('')
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [templateType, setTemplateType] = useState<string>('')
  const [templateTypes, setTemplateTypes] = useState<TemplateTypeMapper[]>([])

  // Fields state - Initialize with some example fields
  const [availableFields, setAvailableFields] = useState<
    AvailableFieldMapper[]
  >([])
  const [assignedFields, setAssignedFields] = useState<AssignedField[]>([])

  // Modal state
  const [isFieldModalOpen, setIsFieldModalOpen] = useState<boolean>(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false)
  const [selectedText, setSelectedText] = useState<string>('')

  // Form state
  const [newFieldName, setNewFieldName] = useState<string>('')
  const [newFieldType, setNewFieldType] = useState<
    'texto' | 'fecha' | 'numero'
  >('texto')
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null)
  const [variableName, setVariableName] = useState<string>('')

  // Loading state
  const [loading, setLoading] = useState<boolean>(false)

  // Preview data
  const [previewData, setPreviewData] = useState<Record<string, string>>({})

  // Initialize with sample content
  const [initialContentSet, setInitialContentSet] = useState<boolean>(false)

  // Local state for selection handling
  const [selectionTimeout, setSelectionTimeout] = useState<number | null>(null)

  // Preview Document from REDUX
  const previewDocument: UploadedFile | null = useSelector(
    (state: PreviewDocumentState) => previewDocumentResult(state)
  )

  // CALLS API
  const firstLoad = async () => {
    setLoading(true)
    await Promise.all([loadAvailableFieldsData(), loadTemplateTypesData()])
    setLoading(false)
  }

  const loadAvailableFieldsData = async () => {
    const response = await getAvailableFields()
    if (response?.data?.data?.results) {
      setAvailableFields(response.data.data.results)
    }
  }

  const loadTemplateTypesData = async () => {
    const response = await getTemplateTypes()
    if (response?.data?.data?.results) {
      setTemplateTypes(response.data.data.results)
    }
  }

  useEffect(() => {
    if (error) {
      ErrorHandler.logError(error as AppError)
      showToastifyError(error.details.errors[0])
    }
  }, [error])

  useEffect(() => {
    firstLoad()
  }, [])

  /**
   * Handle preview document changes from Redux
   */
  useEffect(() => {
    if (previewDocument?.preview) {
      setHtmlContent(previewDocument.preview)
    }
  }, [previewDocument])

  /**
   * Calculate unassigned fields by filtering available fields
   * that are not already assigned to the template
   */
  const unassignedFields = availableFields.filter(
    (field) => !assignedFields.some((assigned) => assigned.fieldId === field.id)
  )

  /**
   * Handle creating a new field
   * This function should be connected to the API to create a new field
   */
  const handleCreateField = useCallback(async (): Promise<void> => {
    if (!newFieldName.trim()) {
      showToastifyError('El nombre del campo es obligatorio')
      return
    }
    // Validate field name length
    if (newFieldName.length > VALIDATION_RULES.FIELD_NAME.MAX_LENGTH) {
      showToastifyError(
        `El nombre del campo debe tener menos de ${VALIDATION_RULES.FIELD_NAME.MAX_LENGTH} caracteres`
      )
      return
    }
    setLoading(true)
    const response = await createAvailableField({
      nombre: newFieldName,
      tipo_dato: newFieldType,
    })
    if (response?.data?.data) {
      await loadAvailableFieldsData()
      setNewFieldName('')
      setNewFieldType('texto')
      setIsFieldModalOpen(false)
    }
    setLoading(false)
  }, [newFieldName, newFieldType])

  /**
   * Handle assigning a field to selected text
   * Replaces selected text with a variable placeholder
   */
  const handleAssignField = useCallback((): void => {
    if (!selectedFieldId || !variableName.trim() || !selectedText.trim()) {
      showToastifyError(
        'Por favor seleccione un campo y proporcione un nombre de variable'
      )
      return
    }

    // Validate variable name
    if (!VALIDATION_RULES.VARIABLE_NAME.PATTERN.test(variableName)) {
      showToastifyError(
        'El nombre de la variable debe comenzar con una letra y contener solo letras, números y guiones bajos'
      )
      return
    }

    if (variableName.length > VALIDATION_RULES.VARIABLE_NAME.MAX_LENGTH) {
      showToastifyError(
        `El nombre de la variable debe tener menos de ${VALIDATION_RULES.VARIABLE_NAME.MAX_LENGTH} caracteres`
      )
      return
    }

    // Check if variable name already exists
    if (
      assignedFields.some((field) => field.variableName === variableName.trim())
    ) {
      showToastifyError(
        'El nombre de la variable ya existe. Por favor, elija un nombre diferente.'
      )
      return
    }

    const newAssignedField: AssignedField = {
      fieldId: selectedFieldId,
      variableName: variableName.trim(),
      selectedText: selectedText,
    }

    // Replace selected text with variable placeholder in HTML content
    const variablePlaceholder = `{{${variableName.trim()}}}`
    const updatedHtml = htmlContent.replace(selectedText, variablePlaceholder)

    setHtmlContent(updatedHtml)
    setAssignedFields((prev) => [...prev, newAssignedField])

    // Reset form
    setSelectedFieldId(null)
    setVariableName('')
    setSelectedText('')
    setIsAssignModalOpen(false)
  }, [selectedFieldId, variableName, selectedText, htmlContent, assignedFields])

  /**
   * Handle removing an assigned field from the template
   * Reverts the variable placeholder back to the original text
   */
  const handleRemoveAssignedField = useCallback(
    (index: number): void => {
      const fieldToRemove = assignedFields[index]
      if (!fieldToRemove) return

      // Replace variable placeholder back to original text
      const variablePlaceholder = `{{${fieldToRemove.variableName}}}`
      const updatedHtml = htmlContent.replace(
        variablePlaceholder,
        fieldToRemove.selectedText
      )

      setHtmlContent(updatedHtml)
      setAssignedFields((prev) => prev.filter((_, i) => i !== index))
    },
    [assignedFields, htmlContent]
  )

  /**
   * Handle saving the template
   * This function should be connected to the API to save the template
   */
  const handleSaveTemplate = useCallback(async (): Promise<void> => {
    if (!templateName.trim() || !htmlContent.trim()) {
      alert('El nombre de la plantilla y el contenido son obligatorios')
      return
    }

    setLoading(true)
    const response = await createTemplate({
      tipo: {
        nombre: templateType,
      },
      nombre: templateName,
      descripcion: templateDescription,
      html_con_campos: htmlContent,
      campos: assignedFields.map((field) => ({
        campo_id: field.fieldId,
        nombre_variable: field.variableName,
      })),
    })
    if (response?.data?.data) {
      showToastifySuccess(
        `Plantilla guardada exitosamente con id: ${response.data.data.id}`
      )
      resetForm()
    }
    setLoading(false)
  }, [templateName, templateDescription, htmlContent, assignedFields])

  /**
   * Reset the form to initial state
   */
  const resetForm = useCallback((): void => {
    setTemplateType('')
    setTemplateName('')
    setTemplateDescription('')
    setHtmlContent('')
    setAssignedFields([])
    setSelectedText('')
    setSelectedFieldId(null)
    setVariableName('')
    setPreviewData({})
  }, [])

  /**
   * Generate HTML preview with replaced variables
   * Uses preview data to show how the template would look with actual values
   */
  const generatePreviewHtml = useCallback((): string => {
    let preview = htmlContent
    assignedFields.forEach((field) => {
      const value =
        previewData[field.variableName] ||
        field.variableName
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())
      preview = preview.replaceAll(`{{${field.variableName}}}`, value)
    })

    return preview
  }, [htmlContent, assignedFields, previewData])

  /**
   * Initialize preview data when assigned fields change
   */
  useEffect(() => {
    const newPreviewData: Record<string, string> = {}
    assignedFields.forEach((field) => {
      if (!previewData[field.variableName]) {
        newPreviewData[field.variableName] = field.variableName
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())
      } else {
        newPreviewData[field.variableName] = previewData[field.variableName]
      }
    })
    setPreviewData(newPreviewData)
  }, [assignedFields])

  /**
   * Handle text selection from the document editor
   * Shows assignment modal after a delay to allow complete selection
   */
  const handleTextSelection = useCallback(
    (text: string, from: number, to: number) => {
      // Clear previous timeout
      if (selectionTimeout) {
        clearTimeout(selectionTimeout)
      }

      if (text.trim() && text.length > 1) {
        setSelectedText(text)

        // Show modal after a delay to ensure selection is complete
        const timeout = setTimeout(() => {
          setIsAssignModalOpen(true)
        }, 700)

        setSelectionTimeout(timeout)
      }
    },
    [selectionTimeout, setSelectedText, setIsAssignModalOpen]
  )

  /**
   * Handle closing assign modal and reset selection
   */
  const handleCloseAssignModal = useCallback(() => {
    setIsAssignModalOpen(false)
    setSelectedText('')
    setSelectedFieldId(null)
    setVariableName('')
  }, [
    setIsAssignModalOpen,
    setSelectedText,
    setSelectedFieldId,
    setVariableName,
  ])

  /**
   * Handle assignment confirmation
   */
  const handleConfirmAssignment = useCallback(() => {
    handleAssignField()
  }, [handleAssignField])

  /**
   * Handle closing create field modal
   */
  const handleCloseFieldModal = useCallback(() => {
    setIsFieldModalOpen(false)
    setNewFieldName('')
    setNewFieldType('texto')
  }, [setIsFieldModalOpen, setNewFieldName, setNewFieldType])

  /**
   * Handle field creation confirmation
   */
  const handleConfirmFieldCreation = useCallback(async () => {
    await handleCreateField()
  }, [handleCreateField])

  return {
    // Template state
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    htmlContent,
    setHtmlContent,
    templateType,
    setTemplateType,
    templateTypes,

    // Fields state
    availableFields,
    setAvailableFields,
    assignedFields,
    setAssignedFields,
    unassignedFields,

    // Modal state
    isFieldModalOpen,
    setIsFieldModalOpen,
    isAssignModalOpen,
    setIsAssignModalOpen,
    selectedText,
    setSelectedText,

    // Form state
    newFieldName,
    setNewFieldName,
    newFieldType,
    setNewFieldType,
    selectedFieldId,
    setSelectedFieldId,
    variableName,
    setVariableName,

    // Loading state
    loading,
    setLoading,

    // Preview data
    previewData,
    setPreviewData,

    // Actions
    handleCreateField,
    handleAssignField,
    handleRemoveAssignedField,
    handleSaveTemplate,
    resetForm,
    generatePreviewHtml,
    handleTextSelection,
    handleCloseAssignModal,
    handleConfirmAssignment,
    handleCloseFieldModal,
    handleConfirmFieldCreation,
  }
}
