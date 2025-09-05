import React from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import { paletteColors } from '@/utils/paletteColors'
import { HtmlPreviewProps } from '@/interfaces/propsInterface'

const HtmlPreview: React.FC<HtmlPreviewProps> = ({
  htmlContent,
  fileName,
  onClose,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        maxHeight: 500,
        overflow: 'auto',
        border: `2px dashed ${paletteColors.colorPrimary}`,
        borderRadius: 2,
      }}
    >
      {/* Header */}
      {(fileName || onClose) && (
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {fileName && (
            <Typography
              variant='h6'
              sx={{ color: paletteColors.colorSecondary }}
            >
              Vista previa: {fileName}
            </Typography>
          )}
          {onClose && (
            <IconButton
              size='small'
              onClick={onClose}
              sx={{ color: 'text.secondary' }}
            >
              ✕
            </IconButton>
          )}
        </Box>
      )}

      {/* Contenido HTML */}
      <Box
        sx={{
          backgroundColor: '#fafafa',
          minHeight: 300,
          '& *': {
            fontFamily: 'inherit !important',
          },
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Paper>
  )
}

export default HtmlPreview
