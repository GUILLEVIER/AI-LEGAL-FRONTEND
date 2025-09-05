import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
} from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { AssignedField } from '@/interfaces/interactiveEditorInterface'
import { useDocumentPreview } from '@/hooks/components/useDocumentPreview'
import { DocumentPreviewProps } from '@/interfaces/propsInterface'

/**
 * Component for previewing the document with field values
 * Allows users to input sample data to see how the template will look
 */
const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  htmlContent,
  assignedFields,
  previewData,
  onPreviewDataChange,
}) => {
  const {
    hasContent,
    hasFields,
    generatePreviewHtml,
    handlePreviewDataChange,
    resetPreviewData,
    getFormattedLabel,
    getPlaceholderText,
  } = useDocumentPreview({
    htmlContent,
    assignedFields,
    previewData,
    onPreviewDataChange,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Document Preview Section */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant='h6'
              component='h3'
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Visibility />
              Vista previa del documento
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Preview Content */}
          <Box
            dangerouslySetInnerHTML={{
              __html: generatePreviewHtml().replace(/\n/g, '<br>'),
            }}
          />

          {!hasContent && (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center', fontStyle: 'italic' }}
            >
              Comienza a escribir en el editor para ver la vista previa aquí
            </Typography>
          )}
        </CardContent>
      </Card>
      {/* Preview Data Input Section */}
      {hasFields && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant='h6' component='h3'>
                Datos de vista previa
              </Typography>
              <Button
                variant='outlined'
                size='small'
                onClick={resetPreviewData}
              >
                Restablecer valores
              </Button>
            </Box>

            <Grid container spacing={2}>
              {assignedFields.map((field: AssignedField) => (
                <Grid size={{ xs: 12, sm: 6 }} key={field.variableName}>
                  <TextField
                    fullWidth
                    label={getFormattedLabel(field.variableName)}
                    value={previewData[field.variableName] || ''}
                    onChange={(e) =>
                      handlePreviewDataChange(
                        field.variableName,
                        e.target.value
                      )
                    }
                    variant='outlined'
                    size='small'
                    placeholder={getPlaceholderText(field.variableName)}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default DocumentPreview
