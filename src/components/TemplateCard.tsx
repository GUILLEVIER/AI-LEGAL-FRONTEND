import React from 'react'
import {
  Card,
  CardContent,
  CardActions,
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
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  PictureAsPdfOutlined,
  DescriptionOutlined,
} from '@mui/icons-material'
import { useTemplateCard } from '../hooks/components/useTemplateCard'

// INTERFACE TENTADORA
interface Template {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: 'active' | 'inactive'
  description?: string
}

// INTERFACE TENTADORA
interface TemplateCardProps {
  template: Template
  onEdit?: (template: Template) => void
  onDelete?: (templateId: string) => void
  onDownload?: (template: Template) => void
  onPreview?: (template: Template) => void
}

/**
 * Diseño de tarjeta con hover effects.
 * Iconos por tipo de archivo (PDF, Word, etc.).
 * Menú contextual con opciones (editar, descargar, eliminar).
 * Chips de Estado (activo/inactivo).
 * Información de Archivo (tamaño, fecha).
 * Tooltips Informativos
 */
const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onEdit,
  onDelete,
  onDownload,
  onPreview,
}) => {
  const {
    anchorEl,
    formatDate,
    formatFileSize,
    handleMenuOpen,
    handleMenuClose,
  } = useTemplateCard()
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <PictureAsPdfOutlined sx={{ fontSize: 32, color: '#d32f2f' }} />
    }
    return <DescriptionOutlined sx={{ fontSize: 32, color: '#1976d2' }} />
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
          <Box sx={{ mr: 2 }}>{getFileIcon(template.type)}</Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Tooltip title={template.name}>
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
                {template.name}
              </Typography>
            </Tooltip>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'
            >
              {formatFileSize(template.size)} •{' '}
              {formatDate(template.uploadDate)}
            </Typography>
          </Box>
          <IconButton size='small' onClick={handleMenuOpen}>
            <MoreVertOutlined />
          </IconButton>
        </Box>

        {template.description && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {template.description}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Chip
            label={template.status === 'active' ? 'Activo' : 'Inactivo'}
            color={template.status === 'active' ? 'success' : 'default'}
            size='small'
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title='Vista previa'>
              <IconButton size='small' onClick={() => onPreview?.(template)}>
                <VisibilityOutlined fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Descargar'>
              <IconButton size='small' onClick={() => onDownload?.(template)}>
                <DownloadOutlined fontSize='small' />
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
            onEdit?.(template)
          }}
        >
          <EditOutlined sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onDownload?.(template)
          }}
        >
          <DownloadOutlined sx={{ mr: 1 }} />
          Descargar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onDelete?.(template.id)
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

export default TemplateCard
