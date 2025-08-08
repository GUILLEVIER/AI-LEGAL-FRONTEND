import React, { useState } from 'react'
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

interface Template {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: 'active' | 'inactive'
  description?: string
}

interface TemplateListProps {
  templates: Template[]
  onEdit?: (template: Template) => void
  onDelete?: (templateId: string) => void
  onDownload?: (template: Template) => void
  onPreview?: (template: Template) => void
}

/**
 * Sistema de filtros (búsqueda, tipo, estado).
 * Paginación funcional.
 * Grid responsive para las tarjetas.
 * Estado vacío cuando no hay plantillas.
 * Contador de resultados.
 */
const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
  onDownload,
  onPreview,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filtros
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType =
      filterType === 'all' || template.type.includes(filterType)
    const matchesStatus =
      filterStatus === 'all' || template.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Paginación
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const getUniqueTypes = () => {
    const types = templates.map((template) => template.type)
    return [...new Set(types)]
  }

  return (
    <Box>
      {/* Controles de filtro y búsqueda */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Plantillas guardadas ({templates.length})
        </Typography>

        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 4 }}>
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
                  {type.includes('pdf') ? 'PDF' : 'Documento'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label='Estado'
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setCurrentPage(1)
              }}
              size='small'
            >
              <MenuItem value='all'>Todos los estados</MenuItem>
              <MenuItem value='active'>Activo</MenuItem>
              <MenuItem value='inactive'>Inactivo</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de plantillas */}
      {filteredTemplates.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {templates.length === 0
              ? 'No hay plantillas guardadas'
              : 'No se encontraron plantillas con los filtros aplicados'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {templates.length === 0
              ? 'Sube tu primera plantilla usando el área de carga superior'
              : 'Intenta ajustar los filtros de búsqueda'}
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedTemplates.map((template) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
                <TemplateCard
                  template={template}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  onPreview={onPreview}
                />
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
        </>
      )}
    </Box>
  )
}

export default TemplateList
