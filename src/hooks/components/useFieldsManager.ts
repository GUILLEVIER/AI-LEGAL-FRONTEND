import { useCallback } from 'react'
import { UseFieldsManagerProps } from '../../interfaces/propsInterface'

/**
 * Custom hook for managing fields functionality
 * Handles field operations and data transformations
 */
export const useFieldsManager = ({
  availableFields,
  assignedFields,
  unassignedFields,
  onCreateField,
  onRemoveAssignedField,
  isLoading = false,
}: UseFieldsManagerProps) => {
  /**
   * Get field name by ID from available fields
   */
  const getFieldNameById = useCallback(
    (fieldId: number): string => {
      const field = availableFields.find((f) => f.id === fieldId)
      return field ? field.name : 'Unknown Field'
    },
    [availableFields]
  )

  /**
   * Get field data type by ID from available fields
   */
  const getFieldTypeById = useCallback(
    (fieldId: number): string => {
      const field = availableFields.find((f) => f.id === fieldId)
      return field ? field.dataType : 'unknown'
    },
    [availableFields]
  )

  /**
   * Get type color for chip display
   */
  const getTypeColor = useCallback(
    (
      type: string
    ):
      | 'default'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning' => {
      switch (type) {
        case 'text':
          return 'primary'
        case 'date':
          return 'secondary'
        case 'number':
          return 'success'
        default:
          return 'default'
      }
    },
    []
  )

  /**
   * Handle create field action
   */
  const handleCreateField = useCallback(() => {
    onCreateField()
  }, [onCreateField])

  /**
   * Handle remove assigned field action
   */
  const handleRemoveAssignedField = useCallback(
    (index: number) => {
      onRemoveAssignedField(index)
    },
    [onRemoveAssignedField]
  )

  /**
   * Check if assign button should be disabled
   */
  const isAssignDisabled = useCallback(() => {
    return isLoading || unassignedFields.length === 0
  }, [isLoading, unassignedFields.length])

  /**
   * Get empty state message for unassigned fields
   */
  const getUnassignedEmptyMessage = useCallback(() => {
    return availableFields.length === 0
      ? 'No fields available to assign.'
      : 'All available fields have been assigned.'
  }, [availableFields.length])

  return {
    // Data state
    hasAvailableFields: availableFields.length > 0,
    hasUnassignedFields: unassignedFields.length > 0,
    hasAssignedFields: assignedFields.length > 0,

    // Counts
    availableFieldsCount: availableFields.length,
    unassignedFieldsCount: unassignedFields.length,
    assignedFieldsCount: assignedFields.length,

    // Functions
    getFieldNameById,
    getFieldTypeById,
    getTypeColor,
    handleCreateField,
    handleRemoveAssignedField,

    // State helpers
    isAssignDisabled: isAssignDisabled(),
    isLoading,
    getUnassignedEmptyMessage,
  }
}
