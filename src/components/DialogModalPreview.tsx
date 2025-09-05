import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import HtmlPreview from './HtmlPreview'
import { DialogModalPreviewProps } from '@/interfaces/propsInterface'

const DialogModalPreview: React.FC<DialogModalPreviewProps> = ({
  open,
  onClose,
  title,
  subtitle,
  htmlContent,
  isLoading = false,
  showInteractiveEditorButton = false,
  onNavigateToEditor,
  type,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
      fullWidth
      PaperProps={{
        sx: {
          width: '80%',
        },
      }}
    >
      <DialogTitle>
        <Typography variant='h6' component='div'>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body2' color='text.secondary'>
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <HtmlPreview
            htmlContent={htmlContent}
            fileName={title}
            onClose={onClose}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ gap: 1 }}>
        {showInteractiveEditorButton && onNavigateToEditor && (
          <Button
            variant='contained'
            color='primary'
            onClick={onNavigateToEditor}
          >
            {type === 'template'
              ? 'Ir al Editor Interactivo a usar plantilla'
              : 'Ir al Editor Interactivo a crear plantilla'}
          </Button>
        )}
        <Button
          color='warning'
          onClick={onClose}
          size='large'
          variant='contained'
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogModalPreview
