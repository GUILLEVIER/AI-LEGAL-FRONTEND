import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Chip,
} from '@mui/material'
import {
  UploadFileOutlined,
  DeleteForeverSharp,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material'
import { paletteColors } from '../utils/paletteColors'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { DocumentUploadProps, UploadedFile } from '../interfaces/propsInterface'

/**
 *
 * Drag & Drop funcional con react-dropzone
 * Validación de archivos (tipo, tamaño, cantidad)
 * Estados visuales (Arrastrando, Rechazado, Hover)
 * Lista de archivos subidos con estado de progreso
 * Iconos de estado (Success, Error, Uploading)
 * Gestión de errores de validación
 * Responsive Design
 */
const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFilesUploaded,
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.png', '.jpg'],
  maxFiles = 1,
  maxSize = 10485760, // 10MB
  disabled = false,
}) => {
  // HOOK
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null)
  const [htmlContent, setHtmlContent] = useState<string>('')
  console.log('Uploaded Files:', uploadedFiles)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        ...file,
        id: `${file.name}-${Date.now()}`,
        name: file.name,
        size: file.size,
        status: 'uploading',
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Simular subida de archivos.
      // Agregar Función que llama a la API para subir el documento.
      newFiles.forEach((file, index) => {
        setTimeout(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, status: Math.random() > 0.1 ? 'success' : 'error' }
                : f
            )
          )
        }, 1000 + index * 500)
      })

      onFilesUploaded?.(acceptedFiles)
    },
    [onFilesUploaded]
  )

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
    disabled,
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  // Simular respuesta HTML de la API
  const handlePreviewFile = async (file: UploadedFile) => {
    if (file.status !== 'success') return

    setPreviewFile(file)

    // Aquí sería la llamada real a la API
    // const response = await apiCall(file)
    // setHtmlContent(response.htmlContent)

    // Simulación de respuesta HTML de la API
    const mockHtmlResponse = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px;">
          Documento Procesado: ${file.name}
        </h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <h3 style="color: #333;">Información del Archivo</h3>
          <p><strong>Nombre:</strong> ${file.name}</p>
          <p><strong>Tamaño:</strong> ${formatFileSize(file.size)}</p>
          <p><strong>Tipo:</strong> ${file.type || 'Desconocido'}</p>
          <p><strong>Fecha de procesamiento:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Contenido Procesado</h3>
          <p style="line-height: 1.6; text-align: justify;">
            Este es el contenido procesado del documento <strong>${
              file.name
            }</strong>. 
            La API ha analizado el archivo y ha extraído la información relevante 
            para su procesamiento legal.
          </p>
          <div style="background-color: #e3f2fd; padding: 15px; border-left: 4px solid #1976d2; margin: 15px 0;">
            <h4 style="margin: 0 0 10px 0; color: #1976d2;">Resumen Ejecutivo</h4>
            <p style="margin: 0; font-style: italic;">
              El documento ha sido procesado exitosamente y está listo para su análisis legal.
              Se han identificado las cláusulas principales y los puntos de interés jurídico.
            </p>
          </div>
        </div>
      </div>
    `

    setHtmlContent(mockHtmlResponse)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutline sx={{ color: 'success.main' }} />
      case 'error':
        return <ErrorOutline sx={{ color: 'error.main' }} />
      default:
        return null
    }
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

  return (
    <Box sx={{ width: '100%' }}>
      {/* Zona de arrastrar y soltar */}
      <Paper
        {...getRootProps()}
        elevation={isDragActive ? 8 : 2}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: isDragActive
            ? `2px dashed ${paletteColors.colorPrimary}`
            : isDragReject
            ? '2px dashed #f44336'
            : '2px dashed #e0e0e0',
          borderRadius: 2,
          backgroundColor: isDragActive
            ? 'action.hover'
            : isDragReject
            ? 'error.light'
            : 'background.paper',
          transition: 'all 0.4s ease',
          opacity: disabled ? 0.6 : 1,
          '&:hover': {
            backgroundColor: disabled ? 'inherit' : 'action.hover',
            borderColor: disabled ? 'inherit' : paletteColors.colorPrimary,
            transform: disabled ? 'none' : 'translateY(-2px)',
            boxShadow: disabled ? 'inherit' : 4,
          },
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ mb: 2 }}>
          <UploadFileOutlined
            sx={{
              fontSize: 48,
              color: isDragActive
                ? 'primary.main'
                : isDragReject
                ? paletteColors.colorWhite
                : 'text.secondary',
              mb: 2,
            }}
          />
        </Box>
        {isDragActive ? (
          <Typography variant='h6' color='primary'>
            ¡Suelta los archivos aquí!
          </Typography>
        ) : isDragReject ? (
          <Typography variant='h6' color={paletteColors.colorWhite}>
            Algunos archivos no son válidos
          </Typography>
        ) : (
          <Box>
            <Typography variant='h6' gutterBottom>
              Arrastra archivos aquí o haz clic para seleccionar
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              Tipos de archivo permitidos: {acceptedFileTypes.join(', ')}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Tamaño máximo: {formatFileSize(maxSize)} | Máximo {maxFiles}{' '}
              archivos
            </Typography>
          </Box>
        )}
      </Paper>
      {/* Errores de validación */}
      {fileRejections.length > 0 && (
        <Box sx={{ my: 2 }}>
          {fileRejections.map(({ file, errors }) => (
            <Paper
              key={file.name}
              sx={{ p: 2, my: 2, backgroundColor: 'error.light' }}
            >
              <Typography variant='subtitle2' color={paletteColors.colorWhite}>
                {file.name}
              </Typography>
              {errors.map((error) => (
                <Typography
                  key={error.code}
                  variant='caption'
                  color={paletteColors.colorWhite}
                  display='block'
                >
                  {error.message}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>
      )}
      {/* Lista de archivos subidos */}
      {uploadedFiles.length > 0 && (
        <>
          <Box>
            <Typography
              gutterBottom
              sx={{ fontWeight: 'bold', my: 2 }}
              variant='subtitle1'
            >
              Archivos subidos ({uploadedFiles.length})
            </Typography>
            <Paper sx={{ maxHeight: 300, overflow: 'auto' }}>
              <List dense>
                {uploadedFiles.map((file) => (
                  <ListItem
                    key={file.id}
                    sx={{
                      borderBottom: '1px solid',
                      borderBottomColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{getStatusIcon(file.status)}</Box>
                    <ListItemText
                      primary={file.name}
                      secondary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Typography variant='caption'>
                            {formatFileSize(file.size)}
                          </Typography>
                          <Chip
                            size='small'
                            label={file.status || 'uploading'}
                            color={getStatusColor(file.status) as any}
                            sx={{ height: 20, fontSize: '0.75rem' }}
                          />
                        </Box>
                      }
                    />
                    <IconButton
                      edge='end'
                      aria-label='preview'
                      onClick={() => handlePreviewFile(file)}
                      size='small'
                      disabled={file.status !== 'success'}
                    >
                      <VisibilityTwoToneIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => removeFile(file.id!)}
                      size='small'
                    >
                      <DeleteForeverSharp />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
          <Box>
            <Typography
              gutterBottom
              sx={{ fontWeight: 'bold', my: 2 }}
              variant='subtitle1'
            >
              Previsualización del Archivo Procesado
            </Typography>
            {previewFile && htmlContent ? (
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  maxHeight: 500,
                  overflow: 'auto',
                  border: `2px dashed ${paletteColors.colorPrimary}`,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: paletteColors.colorSecondary }}
                  >
                    Vista previa: {previewFile.name}
                  </Typography>
                  <IconButton
                    size='small'
                    onClick={() => {
                      setPreviewFile(null)
                      setHtmlContent('')
                    }}
                    sx={{ color: 'text.secondary' }}
                  >
                    ✕
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    backgroundColor: '#fafafa',
                    minHeight: 300,
                    '& *': {
                      fontFamily: 'inherit !important',
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </Paper>
            ) : (
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                  border: `2px dashed #e0e0e0`,
                  borderRadius: 2,
                }}
              >
                <VisibilityTwoToneIcon
                  sx={{
                    fontSize: 48,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                />
                <Typography variant='body1' color='text.secondary'>
                  Selecciona el icono de previsualización en un archivo
                  procesado exitosamente para ver el contenido HTML generado.
                </Typography>
              </Paper>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default DocumentUpload
