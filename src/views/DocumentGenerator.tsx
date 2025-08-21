import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material'
import { ArrowBack, Visibility } from '@mui/icons-material'
import { ContainerApp, BoxContainerApp } from '../layouts'
import DocumentPreview from '../components/interactiveEditor/DocumentPreview'
import InformationSection from '../components/InformationSection'
import { useDocumentGenerator } from '../hooks/views/useDocumentGenerator'
import { Template } from '../interfaces/apiResponsesInterface'

/**
 * Document Generator View Component
 * Allows users to select a template and generate documents by filling in the required fields
 * Priority order:
 * 1. Template from Redux (previewDocument)
 * 2. Template from URL parameter (templateId)
 * 3. Template selector fallback
 */
const DocumentGenerator: React.FC = () => {
  const {
    // Templates state
    templates,
    templateId,
    selectedTemplateId,
    setSelectedTemplateId,
    selectedTemplate,
    initializationComplete,

    // Loading states
    isLoading,
    error,
    loadingTemplate,
    loadingGenerate,

    // Document state
    documentName,
    setDocumentName,
    previewData,
    setPreviewData,

    // Actions
    handleTemplateSelect,
    handleGenerateDocument,
    handleResetDocument,
    getAssignedFields,
  } = useDocumentGenerator()

  // Show loading during initialization
  if (!initializationComplete) {
    return (
      <>
        <Typography component='h1' variant='h4' sx={{ mb: 3 }}>
          Generador de Documentos
        </Typography>
        <ContainerApp maxWidth='xl'>
          <BoxContainerApp>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress size={60} />
            </Box>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ textAlign: 'center' }}
            >
              Inicializando generador de documentos...
            </Typography>
          </BoxContainerApp>
        </ContainerApp>
      </>
    )
  }

  // Determine if we should show template selector
  const shouldShowTemplateSelector = !selectedTemplate // !previewDocument

  return (
    <>
      <Typography component='h1' variant='h4' sx={{ mb: 3 }}>
        Generador de Documentos
      </Typography>

      <ContainerApp maxWidth='xl'>
        <BoxContainerApp>
          {/* Template source indicator */}
          {selectedTemplate && (
            <Alert severity='info' sx={{ mb: 3 }}>
              {templateId
                ? '🔗 Plantilla cargada desde la URL'
                : '📄 Plantilla seleccionada manualmente'}
            </Alert>
          )}

          {/* Template Selection - Only show if no template is loaded */}
          {shouldShowTemplateSelector && (
            <Card sx={{ mb: 3, width: '50%' }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Seleccionar Plantilla
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Plantilla</InputLabel>
                  <Select
                    value={selectedTemplateId}
                    onChange={(e) => {
                      const value = e.target.value as number
                      setSelectedTemplateId(value)
                      handleTemplateSelect(value)
                    }}
                    label='Plantilla'
                    disabled={isLoading}
                  >
                    <MenuItem value=''>Seleccione una plantilla</MenuItem>
                    {templates.map((template) => (
                      <MenuItem key={template.id} value={template.id}>
                        {template.nombre} -{' '}
                        {template.tipo_info?.nombre || 'Sin tipo'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedTemplate && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Descripción:</strong>{' '}
                      {(selectedTemplate as Template)?.descripcion ||
                        'Sin descripción'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Campos requeridos:</strong>{' '}
                      {(selectedTemplate as Template)?.campos_asociados
                        ?.length || 0}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Template Info Card - Show when template is loaded from Redux or URL */}
          {selectedTemplate && !shouldShowTemplateSelector && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper elevation={1} sx={{ p: 3, my: 3 }}>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Plantilla: {selectedTemplate.nombre}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 1 }}
                  >
                    <strong>Tipo:</strong>{' '}
                    {selectedTemplate.tipo_info?.nombre || 'Sin tipo'}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 1 }}
                  >
                    <strong>Descripción:</strong>{' '}
                    {(selectedTemplate as Template)?.descripcion ||
                      'Sin descripción'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Campos requeridos:</strong>{' '}
                    {(selectedTemplate as Template)?.campos_asociados?.length ||
                      0}
                  </Typography>
                </Paper>
              </Grid>
              {/* Document Information and Actions */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <InformationSection
                  type='document'
                  documentName={documentName}
                  setDocumentName={setDocumentName}
                  onGenerateDocument={handleGenerateDocument}
                  onResetDocument={handleResetDocument}
                  loading={loadingGenerate}
                  disabled={!selectedTemplate}
                />
              </Grid>
            </Grid>
          )}

          {/* Loading state */}
          {(isLoading || loadingTemplate) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error state */}
          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error.message || 'Error al cargar los datos'}
            </Alert>
          )}

          {/* Document Preview and Generation */}
          {selectedTemplate && !loadingTemplate && (
            <Grid container spacing={3}>
              {/* Document Preview */}
              <Grid size={{ xs: 12, lg: 12 }}>
                <Typography
                  variant='h6'
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Visibility />
                  Completar Campos y Previsualizar Documento
                </Typography>
                <DocumentPreview
                  htmlContent={selectedTemplate.html_con_campos}
                  assignedFields={getAssignedFields()}
                  previewData={previewData}
                  onPreviewDataChange={setPreviewData}
                />
              </Grid>
            </Grid>
          )}

          {/* No template selected state */}
          {shouldShowTemplateSelector &&
            !selectedTemplate &&
            !loadingTemplate &&
            selectedTemplateId === '' && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant='h6' color='text.secondary'>
                  Seleccione una plantilla para comenzar a generar documentos
                </Typography>
              </Box>
            )}
        </BoxContainerApp>
      </ContainerApp>
    </>
  )
}

export default DocumentGenerator
