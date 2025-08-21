import { useState } from 'react'

export const useTemplate = () => {
  const [selectedButton, setSelectedButton] = useState<any>({
    existingTemplates: false,
    createTemplate: false,
    uploadedDocuments: false,
    generatedDocuments: false,
  })

  return {
    selectedButton,
    setSelectedButton,
  }
}
