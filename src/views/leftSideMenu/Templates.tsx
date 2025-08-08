import React from 'react'
import { useTemplate } from '../../hooks/views/leftSideMenu/useTemplate'
import { Box, Button, Typography, Alert, Chip, Divider } from '@mui/material'
import { BoxContainerApp, ContainerApp } from '../../layouts'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import DocumentUpload from '../../components/DocumentUpload'
import TemplateList from '../../components/TemplateList'
import { TemplateItems } from '../../data/TemplateItems'
import { paletteColors } from '../../utils/paletteColors'

const Templates: React.FC = () => {
  const {
    files,
    isUploading,
    uploadFiles,
    deleteFile,
    clearFiles,
    successfulUploads,
    failedUploads,
    handleFilesUploaded,
  } = useTemplate()

  return (
    <>
      <Typography component='h1' variant='h5'>
        Gestión de Plantillas
      </Typography>
      <ContainerApp maxWidth='lg'>
        <BoxContainerApp>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Button variant='contained' color='primary' onClick={() => {}}>
              Listar Plantillas
            </Button>
            <Button variant='contained' color='primary' onClick={() => {}}>
              Crear Plantilla
            </Button>
          </Box>
          {/* Sección de subida del documento */}
          <Box sx={{ my: 2 }}>
            <Typography
              gutterBottom
              sx={{ fontWeight: 'bold', my: 2 }}
              variant='subtitle1'
            >
              Subir Nuevo Documento
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
                • Los archivos subidos se procesarán automáticamente para dar
                paso a la creación de plantillas.
              </Typography>
              <Typography variant='body2' color={paletteColors.colorBlack}>
                • Formatos soportados: PDF, Word (.doc, .docx), Imagen (.jpg,
                .png)
              </Typography>
              <Typography variant='body2' color={paletteColors.colorBlack}>
                • Tamaño máximo por archivo: 10MB
              </Typography>
            </Box>
            {/* Información de estado */}
            {files.length > 0 && (
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
                  disabled={files.length === 0}
                >
                  Limpiar Todo
                </Button>
              </Box>
            )}
            {/* Componente de subida de documentos react-dropzone */}
            <DocumentUpload
              onFilesUploaded={handleFilesUploaded}
              acceptedFileTypes={['.pdf', '.doc', '.docx', '.png', '.jpg']}
              maxFiles={1}
              maxSize={10485760} // 10MB
              disabled={isUploading}
            />

            {/* Alerta de estado de subida */}
            {isUploading && (
              <Alert severity='info' sx={{ my: 2 }}>
                Subiendo archivos... Por favor espera.
              </Alert>
            )}
          </Box>

          {/* Sección de plantillas existentes */}
          {/* <Box>
            <TemplateList
              templates={TemplateItems}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
              onDownload={handleDownloadTemplate}
              onPreview={handlePreviewTemplate}
            />
          </Box> */}
        </BoxContainerApp>
      </ContainerApp>
    </>
  )
}

export default Templates
