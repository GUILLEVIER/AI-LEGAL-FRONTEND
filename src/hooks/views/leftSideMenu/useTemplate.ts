import { useState, useCallback } from 'react'
import { useDocumentsApi } from '../../api/apiWithAuth/useDocumentsApi'
import { useDropzone } from 'react-dropzone'
import { UploadDocumentResponse } from '../../../interfaces/apiResponsesInterface'
import { UploadedFile } from '../../../interfaces/propsInterface'

/**
 * Estado mejorado para gestión de archivos.
 * Funciones asíncronas de subida.
 * Manejo de errores y reintentos.
 * Estados de loading.
 * TypeScript interfaces para type safety
 * Drag & Drop funcional con react-dropzone
 * Validación de archivos (tipo, tamaño, cantidad)
 * Estados visuales (Arrastrando, Rechazado, Hover)
 * Lista de archivos subidos con estado de progreso
 * Iconos de estado (Success, Error, Uploading)
 * Gestión de errores de validación
 * Responsive Design
 */
export const useTemplate = () => {
  // USE STATE AND HOOKS

  // ALMACENARÁ ARCHIVOS SUBIDOS TANTO BUENOS COMO MALOS CON UNA ESTRUCTURA EXTENDIDA A FILE
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  // SE OBTENDRA EL ARCHIVO DESDE uploadedFiles Y OBTENDRÁ EL VALOR DE preview
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null)
  // ALMACENA EL CONTENIDO EN HTML DEL ARCHIVO
  const [htmlContent, setHtmlContent] = useState<string>('')
  // ALMACENA LAS RESPUESTAS DE SUBIDA CON UN id QUE CORRESPONDE AL id DEL ARCHIVO
  const [uploadResponses, setUploadResponses] = useState<
    Record<string, UploadDocumentResponse>
  >({})
  const {
    isLoading,
    error,
    getUploadedDocuments,
    getAvailableFields,
    getTemplates,
    getTemplate,
    getGeneratedDocuments,
    getGeneratedDocument,
    getMyFavorites,
    getTemplateTypes,
    // Métodos POST
    uploadDocument,
    createAvailableField,
    createTemplate,
    generateDocument,
    addFavorite,
    removeFavorite,
  } = useDocumentsApi()

  // CONSTANTES
  const acceptedFileTypes = ['.pdf', '.doc', '.docx', '.png', '.jpg']
  const maxFiles = 1
  const maxSize = 10485760 // 10MB
  const successfulUploads = uploadedFiles.filter(
    (file) => file.status === 'success'
  ).length
  const failedUploads = uploadedFiles.filter(
    (file) => file.status === 'error'
  ).length

  // Upload files
  // REALIZAR SUBIDA DE ARCHIVOS
  const uploadFiles = useCallback(
    async (acceptedFiles: File[]) => processFiles(acceptedFiles),
    [uploadDocument]
  )

  const processFiles = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const newUploadedFile: UploadedFile = {
        id: `${file.name}-${Date.now()}`,
        status: 'uploading' as const,
        preview: undefined,
        file,
        name: file.name,
        size: file.size,
      }
      setUploadedFiles((prev) => [...prev, newUploadedFile])

      const response = await uploadDocument(file)
      if (response?.data?.data) {
        setUploadResponses((prev) => ({
          ...prev,
          [newUploadedFile.id!]: response.data.data,
        }))

        // Si hay respuesta válida, marcamos como éxito
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === newUploadedFile.id
              ? {
                  ...f,
                  preview: response.data.data.texto_extraido,
                  responseId: response.data.data.id,
                  status: 'success' as const,
                }
              : f
          )
        )
      } else {
        // Si no hay respuesta válida, marcamos como error
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === newUploadedFile.id ? { ...f, status: 'error' as const } : f
          )
        )
      }
    }
  }

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    uploadFiles(uploadedFiles)
  }

  // Delete file
  // Elimina el archivo desde la base de datos.
  // TODO: Falta implementar la eliminación.
  const handleDeleteFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
    // Limpiar también la respuesta del API asociada
    setUploadResponses((prev) => {
      const newResponses = { ...prev }
      delete newResponses[fileId]
      return newResponses
    })
  }, [])

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
    // Limpiar también la respuesta del API asociada
    setUploadResponses((prev) => {
      const newResponses = { ...prev }
      delete newResponses[fileId]
      return newResponses
    })
  }

  // Clear all files
  // Limpia toda la pantalla de archivos subidos. No los elimina desde la base de datos.
  const clearFiles = useCallback(() => {
    setUploadedFiles([])
    setUploadResponses({})
    setPreviewFile(null)
    setHtmlContent('')
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'uploading':
        return 'info'
      default:
        return 'default'
    }
  }

  // Manejar la vista previa del archivo
  const handlePreviewFile = async (file: UploadedFile) => {
    if (file.status !== 'success') return
    setPreviewFile(file)
    let htmlResponse = ''

    if (file.preview) {
      // Limpiar y procesar el HTML de la API
      htmlResponse = file.preview

      // Opcional: Sanitizar o procesar el HTML si es necesario
      // Por ejemplo, asegurar que los estilos se preserven
      htmlResponse = htmlResponse.replace(/<style>/g, '<style scoped>')

      // Si el HTML no tiene estructura básica, podríamos envolverlo
      if (
        !htmlResponse.includes('<html>') &&
        !htmlResponse.includes('<body>')
      ) {
        htmlResponse = `<div class="document-content">${htmlResponse}</div>`
      }
    } else {
      // Fallback si no hay respuesta del API
      htmlResponse = `
        <div style="text-align: center; padding: 20px; color: #666;">
          <p>Vista previa no disponible para este archivo.</p>
          <p>El archivo se procesó correctamente pero no se pudo generar la vista previa.</p>
        </div>
      `
    }

    setHtmlContent(htmlResponse)
  }

  // METHODS USING USE DROPZONE
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      handleFilesUploaded?.(acceptedFiles)
    },
    [handleFilesUploaded]
  )

  // USE DROPZONE
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[`application/${type.slice(1)}`] = [type]
      if (type === '.pdf') acc['application/pdf'] = ['.pdf']
      if (type === '.doc') acc['application/msword'] = ['.doc']
      if (type === '.docx') {
        acc[
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ] = ['.docx']
      }
      if (type === '.png') acc['image/png'] = ['.png']
      if (type === '.jpg') acc['image/jpeg'] = ['.jpg']
      return acc
    }, {} as Record<string, string[]>),
    maxFiles,
    maxSize,
    disabled: isLoading,
  })

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
    isLoading,
    uploadFiles,
    handleDeleteFile,
    clearFiles,
    successfulUploads,
    failedUploads,
    handleFilesUploaded,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
    htmlContent,
    acceptedFileTypes,
    maxFiles,
    maxSize,
    formatFileSize,
    uploadedFiles,
    getStatusColor,
    handlePreviewFile,
    handleRemoveFile,
    previewFile,
    setPreviewFile,
    setHtmlContent,
  }
}
