import React from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Pagination,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { SearchOutlined } from '@mui/icons-material'
import DialogModalPreview from './DialogModalPreview'
import { useUploadedDocumentsList } from '../hooks/components/useUploadedDocumentsList'
import { UploadedDocument } from '../interfaces/apiResponsesInterface'
import DocumentUploadCard from './DocumentUploadCard'

const UploadedDocumentsList: React.FC = () => {
  const {
    documents,
    loading,
    searchTerm,
    setSearchTerm,
    filterType,
    getPaginatedDocuments,
    setFilterType,
    currentPage,
    setCurrentPage,
    handlePageChange,
    getUniqueTypes,
    filteredDocuments,
    handlePreviewDocument,
    previewOpen,
    handleClosePreview,
    previewDoc,
    previewLoading,
    previewHtml,
    handleDeleteDocument,
    navigate,
  } = useUploadedDocumentsList()

  return (
    <Box sx={{ my: 2, width: '100%' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Documentos subidos ({documents.length})
        </Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder='Buscar documentos...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              size='small'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label='Tipo de archivo'
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setCurrentPage(1)
              }}
              size='small'
            >
              <MenuItem value='all'>Todos los tipos</MenuItem>
              {getUniqueTypes().map((type) => (
                <MenuItem key={type} value={type}>
                  {type === 'pdf'
                    ? 'PDF'
                    : type === 'imagen'
                    ? 'Imagen'
                    : 'Texto'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de documentos */}
      {filteredDocuments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {documents.length === 0
              ? 'No hay documentos subidos'
              : 'No se encontraron documentos con los filtros aplicados'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {documents.length === 0
              ? 'Sube tu primer documento usando el creador de plantillas'
              : 'Intenta ajustar los filtros de búsqueda'}
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {getPaginatedDocuments(documents).paginated.map(
              (doc: UploadedDocument) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doc.id}>
                  <DocumentUploadCard
                    key={doc.id}
                    document={doc}
                    onPreview={handlePreviewDocument}
                    onDelete={handleDeleteDocument}
                  />
                </Grid>
              )
            )}
          </Grid>

          {/* Paginación */}
          {getPaginatedDocuments(documents).totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={getPaginatedDocuments(documents).totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                showFirstButton
                showLastButton
              />
            </Box>
          )}

          {/* Modal de previsualización */}
          <DialogModalPreview
            open={previewOpen}
            onClose={handleClosePreview}
            title={previewDoc?.nombre_original || 'Vista previa'}
            subtitle={`Tipo: ${previewDoc?.tipo || ''}`}
            htmlContent={previewHtml}
            isLoading={previewLoading}
            showInteractiveEditorButton={true}
            onNavigateToEditor={() =>
              navigate(`/control-panel/interactive-editor/${previewDoc?.id}`)
            }
            type='document'
          />
        </>
      )}
    </Box>
  )
}

export default UploadedDocumentsList
