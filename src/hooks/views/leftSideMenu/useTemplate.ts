import { useState, useCallback } from 'react'

interface UploadedFile extends File {
  id: string
  status: 'uploading' | 'success' | 'error'
  preview?: string
}

/**
 * Estado mejorado para gestión de archivos.
 * Funciones asíncronas de subida.
 * Manejo de errores y reintentos.
 * Estados de loading.
 * TypeScript interfaces para type safety
 */
export const useTemplate = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Upload files
  const uploadFiles = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)

    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      ...file,
      id: `${file.name}-${Date.now()}`,
      status: 'uploading' as const,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simular proceso de subida
    try {
      for (const file of newFiles) {
        // Aquí iría la lógica real de subida de archivos a tu API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'success' as const } : f
          )
        )
      }
    } catch (error) {
      // Manejar errores de subida
      newFiles.forEach((file) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'error' as const } : f
          )
        )
      })
    } finally {
      setIsUploading(false)
    }
  }, [])

  // Delete file
  const deleteFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }, [])

  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([])
  }, [])

  // Retry upload for failed files
  const retryUpload = useCallback(
    async (fileId: string) => {
      const file = files.find((f) => f.id === fileId)
      if (!file || file.status !== 'error') return

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: 'uploading' as const } : f
        )
      )

      try {
        // Lógica de reintento de subida
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: 'success' as const } : f
          )
        )
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: 'error' as const } : f
          )
        )
      }
    },
    [files]
  )

  const successfulUploads = files.filter(
    (file) => file.status === 'success'
  ).length
  const failedUploads = files.filter((file) => file.status === 'error').length

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    console.log('Archivos subidos:', uploadedFiles)
    uploadFiles(uploadedFiles)
  }

  /*
  const handleEditTemplate = (template: any) => {
    console.log('Editando plantilla:', template)
    // Aquí iría la lógica para editar la plantilla
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Eliminando plantilla:', templateId)
    // Aquí iría la lógica para eliminar la plantilla
  }

  const handleDownloadTemplate = (template: any) => {
    console.log('Descargando plantilla:', template)
    // Aquí iría la lógica para descargar la plantilla
  }

  const handlePreviewTemplate = (template: any) => {
    console.log('Vista previa de plantilla:', template)
    // Aquí iría la lógica para mostrar vista previa
  }
  */

  return {
    files,
    isUploading,
    uploadFiles,
    deleteFile,
    clearFiles,
    retryUpload,
    successfulUploads,
    failedUploads,
    handleFilesUploaded,
  }
}
