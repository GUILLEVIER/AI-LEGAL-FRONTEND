import React from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Pagination,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  SearchOutlined,
  DeleteOutline,
  VisibilityOutlined,
} from '@mui/icons-material'
import DialogModal from './DialogModal'
import HtmlPreview from './HtmlPreview'
import { useUploadedDocuments } from '../hooks/components/useUploadedDocuments'

const UploadedDocuments: React.FC = () => {
  const {
    documents,
    loading,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    currentPage,
    setCurrentPage,
    paginatedDocuments,
    totalPages,
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
  } = useUploadedDocuments()

  return (
    <Box sx={{ my: 2 }}>
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
              ? 'Sube tu primer documento usando el área de carga'
              : 'Intenta ajustar los filtros de búsqueda'}
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedDocuments.map((doc) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doc.id}>
                <Paper sx={{ p: 2 }}>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Typography variant='subtitle1' gutterBottom>
                      {doc.nombre_original}
                    </Typography>
                    <Box>
                      <IconButton
                        aria-label='Previsualizar'
                        onClick={() => handlePreviewDocument(doc)}
                      >
                        <VisibilityOutlined />
                      </IconButton>
                      <IconButton
                        aria-label='Eliminar'
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    Tipo:{' '}
                    {doc.tipo === 'pdf'
                      ? 'PDF'
                      : doc.tipo === 'imagen'
                      ? 'Imagen'
                      : 'Texto'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Fecha subida: {new Date(doc.fecha_subida).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                showFirstButton
                showLastButton
              />
            </Box>
          )}

          {/* Modal de previsualización */}
          <DialogModal
            open={previewOpen}
            handleClose={handleClosePreview}
            dialogModalTitle={
              previewDoc ? previewDoc.nombre_original : 'Vista previa'
            }
            dialogModalContentText={
              previewDoc ? `Tipo: ${previewDoc.tipo}` : ''
            }
            dialogModalContent={
              previewLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 200,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <HtmlPreview
                    htmlContent={previewHtml}
                    fileName={previewDoc?.nombre_original || ''}
                    onClose={handleClosePreview}
                  />
                  {previewDoc && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() =>
                        navigate(
                          `/control-panel/interactive-editor/${previewDoc.id}`
                        )
                      }
                    >
                      Ir al Editor Interactivo
                    </Button>
                  )}
                </>
              )
            }
            dialogModalActions={
              <>
                <Button
                  color='warning'
                  onClick={handleClosePreview}
                  size='large'
                  variant='contained'
                >
                  Cerrar
                </Button>
              </>
            }
          />
        </>
      )}
    </Box>
  )
}

export default UploadedDocuments
