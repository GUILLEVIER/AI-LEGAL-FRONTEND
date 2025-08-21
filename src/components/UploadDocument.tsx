import React from 'react'
import { useUploadDocument } from '../hooks/components/useUploadDocument'
import { Box, Button, Typography, Alert, Chip } from '@mui/material'
import { HtmlPreview } from '.'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { paletteColors } from '../utils/paletteColors'
import {
  CheckCircleOutline,
  DeleteForeverSharp,
  ErrorOutline,
  UploadFileOutlined,
} from '@mui/icons-material'
import { List, ListItem, ListItemText, IconButton, Paper } from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { useNavigate } from 'react-router'

const UploadDocument: React.FC = () => {
  const {
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
    previewDocument,
    setPreviewDocument,
    setHtmlContent,
  } = useUploadDocument()

  const navigate = useNavigate()

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

  return (
    <Box sx={{ my: 2, width: '100%' }}>
      <Typography
        gutterBottom
        sx={{ fontWeight: 'bold', my: 2 }}
        variant='subtitle1'
      >
        1. Subir Nuevo Documento
      </Typography>
      {/* Información adicional */}
      <Box
        sx={{
          my: 2,
          p: 2,
          backgroundColor: paletteColors.colorWhite,
          borderRadius: 2,
        }}
      >
        <Typography variant='body2' color={paletteColors.colorBlack}>
          • Los archivos subidos se procesarán automáticamente para dar paso a
          la creación de plantillas.
        </Typography>
        <Typography variant='body2' color={paletteColors.colorBlack}>
          • Formatos soportados: PDF, Word (.doc, .docx), Imagen (.jpg, .png)
        </Typography>
        <Typography variant='body2' color={paletteColors.colorBlack}>
          • Tamaño máximo por archivo: 10MB
        </Typography>
      </Box>
      {/* Información de estado */}
      {uploadedFiles.length > 0 && (
        <Box
          sx={{
            my: 2,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Chip
            label={`${successfulUploads} - Exitosos`}
            color='success'
            variant='outlined'
          />
          {failedUploads > 0 && (
            <Chip
              label={`${failedUploads} - Fallidos`}
              color='error'
              variant='outlined'
            />
          )}
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<DeleteForeverSharpIcon />}
            onClick={clearFiles}
            disabled={uploadedFiles.length === 0}
          >
            Limpiar Todo
          </Button>
        </Box>
      )}
      <Box sx={{ width: '100%' }}>
        {/* Zona de arrastrar y soltar */}
        <Paper
          {...getRootProps()}
          elevation={isDragActive ? 8 : 2}
          sx={{
            p: 4,
            textAlign: 'center',
            cursor: isLoading ? 'not-allowed' : 'pointer',
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
            opacity: isLoading ? 0.6 : 1,
            '&:hover': {
              backgroundColor: isLoading ? 'inherit' : 'action.hover',
              borderColor: isLoading ? 'inherit' : paletteColors.colorPrimary,
              transform: isLoading ? 'none' : 'translateY(-2px)',
              boxShadow: isLoading ? 'inherit' : 4,
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
                <Typography
                  variant='subtitle2'
                  color={paletteColors.colorWhite}
                >
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
                              {formatFileSize(file.size || 0)}
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
                        onClick={() => handleRemoveFile(file.id!)}
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
                2. Previsualización del Archivo Procesado
              </Typography>
              {previewDocument && htmlContent ? (
                <>
                  <HtmlPreview
                    htmlContent={htmlContent}
                    fileName={previewDocument.name}
                    onClose={() => {
                      setPreviewDocument(null)
                      setHtmlContent('')
                    }}
                  />
                  <Button
                    variant='contained'
                    onClick={() => {
                      navigate(
                        `/control-panel/interactive-editor/${previewDocument.responseId}`
                      )
                    }}
                  >
                    Ir al Editor Interactivo
                  </Button>
                </>
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
      {/* Alerta de estado de subida */}
      {isLoading && (
        <Alert severity='info' sx={{ my: 2 }}>
          Subiendo archivos... Por favor espera.
        </Alert>
      )}
    </Box>
  )
}

export default UploadDocument
