import { useCallback } from 'react'
import { AssignedField } from '../../../interfaces/interactiveEditorInterface'

interface UseDocumentPreviewProps {
  htmlContent: string
  assignedFields: AssignedField[]
  previewData: Record<string, string>
  onPreviewDataChange: (data: Record<string, string>) => void
}

/**
 * Custom hook for managing document preview functionality
 * Handles preview data manipulation and HTML generation
 */
export const useDocumentPreview = ({
  htmlContent,
  assignedFields,
  previewData,
  onPreviewDataChange,
}: UseDocumentPreviewProps) => {
  /**
   * Generate preview HTML with replaced variables
   */
  const generatePreviewHtml = useCallback((): string => {
    let preview = htmlContent

    assignedFields.forEach((field) => {
      const value =
        previewData[field.variableName]?.trim() ||
        field.variableName
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())
      preview = preview.replaceAll(`{{${field.variableName}}}`, value)
    })

    return preview
  }, [htmlContent, assignedFields, previewData])

  /**
   * Handle preview data field change
   */
  const handlePreviewDataChange = useCallback(
    (variableName: string, value: string): void => {
      onPreviewDataChange({
        ...previewData,
        [variableName]: value,
      })
    },
    [previewData, onPreviewDataChange]
  )

  /**
   * Reset preview data to default values
   */
  const resetPreviewData = useCallback((): void => {
    const defaultData: Record<string, string> = {}
    assignedFields.forEach((field) => {
      defaultData[field.variableName] = field.variableName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
    })
    onPreviewDataChange(defaultData)
  }, [assignedFields, onPreviewDataChange])

  /**
   * Generate formatted label from variable name
   */
  const getFormattedLabel = useCallback((variableName: string): string => {
    return variableName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }, [])

  /**
   * Generate placeholder text from variable name
   */
  const getPlaceholderText = useCallback((variableName: string): string => {
    return `Enter ${variableName.replace(/_/g, ' ')}`
  }, [])

  return {
    // Data
    hasContent: !!htmlContent.trim(),
    hasFields: assignedFields.length > 0,

    // Functions
    generatePreviewHtml,
    handlePreviewDataChange,
    resetPreviewData,
    getFormattedLabel,
    getPlaceholderText,
  }
}
