import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Save, Refresh, FileDownload } from '@mui/icons-material'
import { InformationSectionProps } from '@/interfaces/propsInterface'

/**
 * Component that handles information section for both template creation and document generation
 */
const InformationSection: React.FC<InformationSectionProps> = ({
  type,
  // Template props
  templateName = '',
  setTemplateName,
  templateDescription = '',
  setTemplateDescription,
  templateType = '',
  setTemplateType,
  templateTypes = [],
  templateCategories = [],
  templateClassifications = [],
  templateCategory = '',
  templateClassification = '',
  setTemplateCategory,
  setTemplateClassification,
  onSaveTemplate,
  onResetTemplate,
  // Document props
  documentName = '',
  setDocumentName,
  onGenerateDocument,
  onResetDocument,
  // Common props
  loading = false,
  disabled = false,
}) => {
  const isTemplateMode = type === 'template'
  const isDocumentMode = type === 'document'

  return (
    <>
      <Typography variant='h6' sx={{ mb: 1 }}>
        {isTemplateMode
          ? 'Información de la Plantilla'
          : 'Información del Documento'}
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Completa la información requerida para{' '}
        {isTemplateMode ? 'crear la plantilla' : 'generar el documento'}.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            {isTemplateMode && (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label='Nombre de la Plantilla'
                    value={templateName}
                    onChange={(e) => setTemplateName?.(e.target.value)}
                    variant='outlined'
                    placeholder='Ingrese el nombre de la plantilla'
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label='Descripción de la Plantilla'
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription?.(e.target.value)}
                    variant='outlined'
                    placeholder='Ingrese la descripción de la plantilla'
                    multiline
                    rows={3}
                    disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel>Tipo de Plantilla</InputLabel>
                    <Select
                      value={templateType}
                      onChange={(e) => setTemplateType?.(e.target.value)}
                      label='Tipo de Plantilla'
                    >
                      {templateTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel>Tipo de Categoría</InputLabel>
                    <Select
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory?.(e.target.value)}
                      label='Tipo de Categoría'
                    >
                      {templateCategories.map((templateCategory) => (
                        <MenuItem
                          key={templateCategory.id}
                          value={templateCategory.id}
                        >
                          {templateCategory.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel>Tipo de Clasificación</InputLabel>
                    <Select
                      value={templateClassification}
                      onChange={(e) =>
                        setTemplateClassification?.(e.target.value)
                      }
                      label='Tipo de Clasificación'
                    >
                      {templateClassifications.map((templateClassification) => (
                        <MenuItem
                          key={templateClassification.id}
                          value={templateClassification.id}
                        >
                          {templateClassification.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {isDocumentMode && (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label='Nombre del Documento'
                    value={documentName}
                    onChange={(e) => setDocumentName?.(e.target.value)}
                    variant='outlined'
                    placeholder='Ingrese el nombre del documento a generar'
                    required
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            )}

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              {isTemplateMode && (
                <>
                  <Button
                    variant='contained'
                    startIcon={<Save />}
                    onClick={onSaveTemplate}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      'Crear Plantilla'
                    )}
                  </Button>
                  <Button
                    variant='outlined'
                    startIcon={<Refresh />}
                    onClick={onResetTemplate}
                    disabled={loading}
                  >
                    Reiniciar
                  </Button>
                </>
              )}

              {isDocumentMode && (
                <>
                  <Button
                    variant='contained'
                    onClick={onGenerateDocument}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      'Generar Documento'
                    )}
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default InformationSection
