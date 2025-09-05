import { useState, useCallback } from 'react'
import { UseHelpGuideProps } from '../../interfaces/propsInterface'
import { helpSteps } from '../../data/helpSteps'
import { HelpStep } from '../../interfaces/dataInterface'

/**
 * Custom hook for managing help guide functionality
 * Handles expanded state and provides help content data
 */
export const useHelpGuide = ({
  isVisible,
  onToggle,
}: UseHelpGuideProps = {}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  /**
   * Toggle expanded state
   */
  const handleToggle = useCallback(() => {
    if (onToggle) {
      onToggle()
    } else {
      setExpanded(!expanded)
    }
  }, [onToggle, expanded])

  /**
   * Get help steps data
   */
  const getHelpSteps = useCallback((): HelpStep[] => {
    return helpSteps
  }, [])

  /**
   * Get pro tips data
   */
  const getProTips = useCallback((): string[] => {
    return [
      'Start with placeholder text that can be easily identified',
      'Use consistent variable naming conventions (e.g., snake_case)',
      'Test your template with different sample data',
      'Group related fields together for better organization',
    ]
  }, [])

  /**
   * Get current expanded state
   */
  const getCurrentExpandedState = useCallback((): boolean => {
    return isVisible !== undefined ? isVisible : expanded
  }, [isVisible, expanded])

  return {
    // State
    isExpanded: getCurrentExpandedState(),

    // Functions
    handleToggle,

    // Data
    helpSteps: getHelpSteps(),
    proTips: getProTips(),

    // Content
    title: 'How to Use Interactive Editor',
    subtitle:
      'Follow these steps to create dynamic document templates with field assignments.',
    proTipsTitle: '💡 Pro Tips:',
  }
}
