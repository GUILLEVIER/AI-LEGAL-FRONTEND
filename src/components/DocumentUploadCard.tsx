import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  MoreVertOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  PictureAsPdfOutlined,
  DescriptionOutlined,
  ImageOutlined,
  AttachFileOutlined,
} from '@mui/icons-material'
import { DocumentUploadProps } from '../interfaces/propsInterface'
import { useTemplateCard } from '../hooks/components/useTemplateCard'

/**
 * Componente de tarjeta para documentos subidos
 * Incluye previsualización y eliminación de documentos
 * Iconos diferenciados por tipo de archivo
 */
const DocumentUploadCard: React.FC<DocumentUploadProps> = ({
  document,
  onPreview,
  onDelete,
}) => {
  const { anchorEl, formatDate, handleMenuOpen, handleMenuClose } =
    useTemplateCard()

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase()

    if (type.includes('pdf')) {
      return <PictureAsPdfOutlined sx={{ fontSize: 32, color: '#d32f2f' }} />
    }
    if (type.includes('word') || type.includes('doc')) {
      return <DescriptionOutlined sx={{ fontSize: 32, color: '#1976d2' }} />
    }
    if (
      type.includes('image') ||
      type.includes('png') ||
      type.includes('jpg') ||
      type.includes('jpeg')
    ) {
      return <ImageOutlined sx={{ fontSize: 32, color: '#4caf50' }} />
    }
    return <AttachFileOutlined sx={{ fontSize: 32, color: '#757575' }} />
  }

  const getFileTypeLabel = (fileType: string) => {
    const type = fileType.toLowerCase()

    if (type.includes('pdf')) return 'PDF'
    if (type.includes('word') || type.includes('doc')) return 'Word'
    if (
      type.includes('image') ||
      type.includes('png') ||
      type.includes('jpg') ||
      type.includes('jpeg')
    )
      return 'Imagen'
    return 'Archivo'
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ mr: 2 }}>{getFileIcon(document.tipo)}</Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Tooltip title={document.nombre_original}>
              <Typography
                variant='h6'
                component='h3'
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {document.nombre_original}
              </Typography>
            </Tooltip>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'
            >
              {formatDate(document.fecha_subida)}
            </Typography>
          </Box>
          <IconButton size='small' onClick={handleMenuOpen}>
            <MoreVertOutlined />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Chip
            label={getFileTypeLabel(document.tipo)}
            color='primary'
            size='small'
            variant='outlined'
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title='Vista previa'>
              <IconButton size='small' onClick={() => onPreview(document)}>
                <VisibilityOutlined fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onPreview(document)
          }}
        >
          <VisibilityOutlined sx={{ mr: 1 }} />
          Vista previa
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onDelete(document.id)
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteOutlined sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default DocumentUploadCard
