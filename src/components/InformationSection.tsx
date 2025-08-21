import React from 'react'
import {
  Box,
  Button,
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

interface InformationSectionProps {
  type: 'template' | 'document'
  // Props para template
  templateName?: string
  setTemplateName?: (name: string) => void
  templateDescription?: string
  setTemplateDescription?: (description: string) => void
  templateType?: string
  setTemplateType?: (type: string) => void
  templateTypes?: Array<{ id: number; nombre: string }>
  onSaveTemplate?: () => void
  onResetTemplate?: () => void
  // Props para document
  documentName?: string
  setDocumentName?: (name: string) => void
  onGenerateDocument?: () => void
  onResetDocument?: () => void
  // Props comunes
  loading?: boolean
  disabled?: boolean
}

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
    <Paper elevation={1} sx={{ p: 3, my: 3 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {isTemplateMode
          ? 'Información de la Plantilla'
          : 'Información del Documento'}
      </Typography>

      {isTemplateMode && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Nombre de la Plantilla'
              value={templateName}
              onChange={(e) => setTemplateName?.(e.target.value)}
              variant='outlined'
              placeholder='Ingrese el nombre de la plantilla'
              required
              disabled={disabled || loading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Descripción de la Plantilla'
              value={templateDescription}
              onChange={(e) => setTemplateDescription?.(e.target.value)}
              variant='outlined'
              placeholder='Ingrese la descripción de la plantilla'
              multiline
              rows={1}
              disabled={disabled || loading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth disabled={disabled || loading}>
              <InputLabel>Tipo de Plantilla</InputLabel>
              <Select
                value={templateType}
                onChange={(e) => setTemplateType?.(e.target.value)}
                label='Tipo de Plantilla'
              >
                {templateTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      {isDocumentMode && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label='Nombre del Documento'
              value={documentName}
              onChange={(e) => setDocumentName?.(e.target.value)}
              variant='outlined'
              placeholder='Ingrese el nombre del documento a generar'
              required
              disabled={disabled || loading}
            />
          </Grid>
        </Grid>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        {isTemplateMode && (
          <>
            <Button
              variant='contained'
              startIcon={<Save />}
              onClick={onSaveTemplate}
              disabled={loading || disabled || !templateName.trim()}
            >
              {loading ? <CircularProgress size={20} /> : 'Crear Plantilla'}
            </Button>
            <Button
              variant='outlined'
              startIcon={<Refresh />}
              onClick={onResetTemplate}
              disabled={loading || disabled}
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
              disabled={loading || disabled || !documentName.trim()}
            >
              {loading ? <CircularProgress size={20} /> : 'Generar Documento'}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default InformationSection
