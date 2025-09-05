import React from 'react'
import {
  Grid,
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Paper,
  Pagination,
} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import TemplateCard from './TemplateCard'
import DialogModalPreview from './DialogModalPreview'
import { useTemplateList } from '@/hooks/components/useTemplateList'
import { Template } from '@/interfaces/apiResponsesInterface'
import TemplateTable from '@/components/TemplateTable'

/**
 * Sistema de filtros (búsqueda, tipo, estado).
 * Paginación funcional.
 * Grid responsive para las tarjetas.
 * Estado vacío cuando no hay plantillas.
 * Contador de resultados.
 */
const TemplateList: React.FC = ({}) => {
  const {
    currentPage,
    filteredTemplates,
    filterType,
    getPaginatedTemplates,
    handlePageChange,
    itemsPerPage,
    loading,
    searchTerm,
    setCurrentPage,
    setFilterType,
    setSearchTerm,
    setTemplateTypes,
    templates,
    templateTypes,
    handleEditTemplate,
    handleDeleteTemplate,
    handleDownloadTemplate,
    handlePreviewTemplate,
    handleClosePreview,
    handleToggleFavorite,
    previewOpen,
    previewTemplate,
    previewLoading,
    navigate,
  } = useTemplateList()

  return (
    <Box sx={{ my: 2, width: '100%' }}>
      {/* Controles de filtro y búsqueda */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Plantillas guardadas ({templates.length})
        </Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder='Buscar plantillas...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
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

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label='Tipo de plantilla'
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setCurrentPage(1)
              }}
              size='small'
            >
              <MenuItem value='all'>Todos los tipos</MenuItem>
              {templateTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de plantillas */}
      {filteredTemplates.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {templates.length === 0
              ? 'No hay plantillas creadas'
              : 'No se encontraron plantillas con los filtros aplicados'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {templates.length === 0
              ? 'Crea tu primera plantilla usando el creador de plantillas'
              : 'Intenta ajustar los filtros de búsqueda'}
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Grid de plantillas
          <Grid container spacing={3}>
            {getPaginatedTemplates(templates).paginated.map(
              (template: Template) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
                  <TemplateCard
                    template={template}
                    onEdit={handleEditTemplate}
                    onDelete={handleDeleteTemplate}
                    onDownload={handleDownloadTemplate}
                    onPreview={handlePreviewTemplate}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Grid>
              )
            )}
          </Grid>
          */}
          <TemplateTable
            data={getPaginatedTemplates(templates).paginated}
            navigate={navigate}
            handleEditTemplate={handleEditTemplate}
            handleDeleteTemplate={handleDeleteTemplate}
            handlePreviewTemplate={handlePreviewTemplate}
            handleToggleFavorite={handleToggleFavorite}
          />

          {/* Paginación */}
          {getPaginatedTemplates(templates).totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={getPaginatedTemplates(templates).totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* Modal de previsualización */}
      <DialogModalPreview
        open={previewOpen}
        onClose={handleClosePreview}
        title={previewTemplate?.nombre || 'Vista previa'}
        subtitle={previewTemplate?.tipo_info?.nombre}
        htmlContent={previewTemplate?.html_con_campos || ''}
        isLoading={previewLoading}
        showInteractiveEditorButton={true}
        onNavigateToEditor={() =>
          navigate(`/control-panel/document-generator/${previewTemplate?.id}`)
        }
        type='template'
      />
    </Box>
  )
}

export default TemplateList
