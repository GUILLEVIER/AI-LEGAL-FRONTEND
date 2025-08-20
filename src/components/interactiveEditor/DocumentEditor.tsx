import React from 'react'
import { EditorContent } from '@tiptap/react'
import {
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Toolbar,
  Paper,
} from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from '@mui/icons-material'
import { useDocumentEditor } from '../../hooks/components/interactiveEditor/useDocumentEditor'

interface DocumentEditorProps {
  content: string
  placeholder?: string
  onUpdate: (content: string) => void
  onTextSelection?: (selectedText: string, from: number, to: number) => void
  editable?: boolean
}

/**
 * Document editor component using TipTap
 * Provides rich text editing capabilities with text selection handling
 */
const DocumentEditor: React.FC<DocumentEditorProps> = ({
  content,
  placeholder,
  onUpdate,
  onTextSelection,
  editable = true,
}) => {
  const {
    editor,
    handleFontFamilyChange,
    setTextAlign,
    toggleBold,
    toggleItalic,
    toggleStrike,
    isActive,
    isReady,
  } = useDocumentEditor({
    content,
    placeholder,
    onUpdate,
    onTextSelection,
    editable,
  })

  if (!isReady) {
    return null
  }

  return (
    <Paper elevation={1} sx={{ border: '1px solid #e0e0e0' }}>
      {/* Toolbar */}
      <Toolbar
        variant='dense'
        sx={{ minHeight: 48, borderBottom: '1px solid #e0e0e0' }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Text formatting */}
          <IconButton
            size='small'
            onClick={toggleBold}
            color={isActive('bold') ? 'primary' : 'default'}
            disabled={!editable}
          >
            <FormatBold />
          </IconButton>

          <IconButton
            size='small'
            onClick={toggleItalic}
            color={isActive('italic') ? 'primary' : 'default'}
            disabled={!editable}
          >
            <FormatItalic />
          </IconButton>

          <IconButton
            size='small'
            onClick={toggleStrike}
            color={isActive('strike') ? 'primary' : 'default'}
            disabled={!editable}
          >
            <FormatUnderlined />
          </IconButton>

          {/* Font family selector */}
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <Select
              defaultValue=''
              displayEmpty
              disabled={!editable}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
            >
              <MenuItem value=''>Font</MenuItem>
              <MenuItem value='Arial'>Arial</MenuItem>
              <MenuItem value='Times New Roman'>Times New Roman</MenuItem>
              <MenuItem value='Courier New'>Courier New</MenuItem>
              <MenuItem value='Helvetica'>Helvetica</MenuItem>
            </Select>
          </FormControl>

          {/* Text alignment */}
          <IconButton
            size='small'
            onClick={() => setTextAlign('left')}
            color={
              isActive('paragraph', { textAlign: 'left' })
                ? 'primary'
                : 'default'
            }
            disabled={!editable}
          >
            <FormatAlignLeft />
          </IconButton>

          <IconButton
            size='small'
            onClick={() => setTextAlign('center')}
            color={
              isActive('paragraph', { textAlign: 'center' })
                ? 'primary'
                : 'default'
            }
            disabled={!editable}
          >
            <FormatAlignCenter />
          </IconButton>

          <IconButton
            size='small'
            onClick={() => setTextAlign('right')}
            color={
              isActive('paragraph', { textAlign: 'right' })
                ? 'primary'
                : 'default'
            }
            disabled={!editable}
          >
            <FormatAlignRight />
          </IconButton>

          <IconButton
            size='small'
            onClick={() => setTextAlign('justify')}
            color={
              isActive('paragraph', { textAlign: 'justify' })
                ? 'primary'
                : 'default'
            }
            disabled={!editable}
          >
            <FormatAlignJustify />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Editor content */}
      <Box
        sx={{
          p: 2,
          minHeight: 400,
          '& .ProseMirror': {
            outline: 'none !important',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#333',
          },
          '& .ProseMirror p.is-editor-empty:first-of-type::before': {
            content: 'attr(data-placeholder)',
            float: 'left',
            color: '#999',
            pointerEvents: 'none',
            height: 0,
          },
          '& .variable-highlight': {
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            padding: '2px 4px',
            borderRadius: '4px',
            fontWeight: 'bold',
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  )
}

export default DocumentEditor
