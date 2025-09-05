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
  StarOutlined,
  StarBorderOutlined,
  GavelOutlined,
  BusinessCenterOutlined,
  AssignmentOutlined,
  BalanceOutlined,
  AccountBalanceOutlined,
} from '@mui/icons-material'
import { useTemplateCard } from '@/hooks/components/useTemplateCard'
import { TemplateCardProps } from '@/interfaces/propsInterface'

/**
 * Diseño de tarjeta con hover effects.
 * Iconos por tipo de archivo (PDF, Word, etc.).
 * Menú contextual con opciones (editar, descargar, eliminar).
 * Chips de Estado (activo/inactivo).
 * Información de Archivo (tamaño, fecha).
 * Tooltips Informativos
 * Favoritos con estrella
 */
const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onEdit,
  onDelete,
  onDownload,
  onPreview,
  onToggleFavorite,
}) => {
  const { anchorEl, formatDate, handleMenuOpen, handleMenuClose } =
    useTemplateCard()

  const getFileIcon = (templateType?: { nombre: string }) => {
    console.log('Template Type:', templateType)
    const type = templateType?.nombre.toLowerCase() || ''

    // Iconos para tipos de documentos legales
    if (
      type.includes('contrato') ||
      type.includes('convenio') ||
      type.includes('acuerdo')
    ) {
      return <BusinessCenterOutlined sx={{ fontSize: 32, color: '#2e7d32' }} />
    }
    if (
      type.includes('demanda') ||
      type.includes('denuncia') ||
      type.includes('querella')
    ) {
      return <GavelOutlined sx={{ fontSize: 32, color: '#d32f2f' }} />
    }
    if (
      type.includes('escrito') ||
      type.includes('alegato') ||
      type.includes('recurso')
    ) {
      return <AssignmentOutlined sx={{ fontSize: 32, color: '#1976d2' }} />
    }
    if (
      type.includes('sentencia') ||
      type.includes('resolución') ||
      type.includes('auto')
    ) {
      return <BalanceOutlined sx={{ fontSize: 32, color: '#7b1fa2' }} />
    }
    if (
      type.includes('poder') ||
      type.includes('autorización') ||
      type.includes('mandato')
    ) {
      return <AccountBalanceOutlined sx={{ fontSize: 32, color: '#f57c00' }} />
    }

    // Icono por defecto para documentos genéricos
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
          <Box sx={{ mr: 2 }}>{getFileIcon(template.tipo)}</Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={template.nombre}>
                <Typography
                  variant='h6'
                  component='h3'
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flexGrow: 1,
                  }}
                >
                  {template.nombre}
                </Typography>
              </Tooltip>
              <Tooltip
                title={
                  template.es_favorito
                    ? 'Quitar de favoritos'
                    : 'Agregar a favoritos'
                }
              >
                <IconButton
                  size='small'
                  onClick={() => onToggleFavorite?.(template.id)}
                  sx={{
                    color: template.es_favorito ? '#ffd700' : 'text.secondary',
                  }}
                >
                  {template.es_favorito ? (
                    <StarOutlined />
                  ) : (
                    <StarBorderOutlined />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'
            >
              {formatDate(template.fecha_creacion)}
            </Typography>
          </Box>
          <IconButton size='small' onClick={handleMenuOpen}>
            <MoreVertOutlined />
          </IconButton>
        </Box>

        {template.descripcion && (
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
            {template.descripcion}
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
            label={template.tipo?.nombre || 'Plantilla'}
            color='primary'
            size='small'
            variant='outlined'
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title='Vista previa'>
              <IconButton size='small' onClick={() => onPreview?.(template)}>
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
            onPreview?.(template)
          }}
        >
          <VisibilityOutlined sx={{ mr: 1 }} />
          Vista previa
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onDelete?.(template.id.toString())
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
