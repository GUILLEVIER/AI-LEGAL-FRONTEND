import { useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Mark, mergeAttributes } from '@tiptap/core'
import { UseDocumentEditorProps } from '../../interfaces/propsInterface'

/**
 * Custom hook for managing document editor state and actions
 * Handles TipTap editor initialization and provides text formatting functions
 */
export const useDocumentEditor = ({
  content,
  placeholder,
  onUpdate,
  onTextSelection,
  editable = true,
}: UseDocumentEditorProps) => {
  // Extensión para resaltar variables {{campo}}
  // TODO: ANALIZARLO EN PROFUNDIDAD
  const VariableMark = Mark.create({
    name: 'variable',
    inclusive: false,
    parseHTML() {
      return [
        {
          tag: 'span[data-variable]',
        },
      ]
    },
    renderHTML({ HTMLAttributes }) {
      return [
        'span',
        mergeAttributes(HTMLAttributes, {
          'data-variable': 'true',
          class: 'variable-highlight',
        }),
        0,
      ]
    },
    addInputRules() {
      return [
        {
          find: /\{\{([a-zA-Z0-9_]+)\}\}/g,
          handler: ({ state, range, match }) => {
            state.tr.addMark(range.from, range.to, this.type.create())
          },
        },
      ]
    },
  })

  /**
   * Initialize TipTap editor with extensions
   */
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      VariableMark,
    ],
    content: content,
    editable: editable,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
    onSelectionUpdate: ({ editor }) => {
      if (!onTextSelection) return

      const { from, to } = editor.state.selection
      if (from !== to) {
        const selectedText = editor.state.doc.textBetween(from, to)
        if (selectedText.trim() && selectedText.length > 1) {
          onTextSelection(selectedText, from, to)
        }
      }
    },
  })

  /**
   * Update editor content when content prop changes
   * This is necessary because TipTap doesn't automatically update content after initialization
   */
  // TODO: ANALIZARLO EN PROFUNDIDAD
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [editor, content])

  /**
   * Handle font family change
   */
  const handleFontFamilyChange = useCallback(
    (fontFamily: string) => {
      if (editor && fontFamily) {
        // Apply font family using CSS style
        editor.chain().focus().run()
      }
    },
    [editor]
  )

  /**
   * Handle text alignment
   */
  const setTextAlign = useCallback(
    (alignment: 'left' | 'center' | 'right' | 'justify') => {
      if (editor) {
        editor.chain().focus().setTextAlign(alignment).run()
      }
    },
    [editor]
  )

  /**
   * Toggle bold formatting
   */
  const toggleBold = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBold().run()
    }
  }, [editor])

  /**
   * Toggle italic formatting
   */
  const toggleItalic = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleItalic().run()
    }
  }, [editor])

  /**
   * Toggle strike formatting
   */
  const toggleStrike = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleStrike().run()
    }
  }, [editor])

  /**
   * Check if specific formatting is active
   */
  const isActive = useCallback(
    (name: string, attributes?: Record<string, any>) => {
      if (!editor) return false
      return editor.isActive(name, attributes)
    },
    [editor]
  )

  return {
    editor,
    // Actions
    handleFontFamilyChange,
    setTextAlign,
    toggleBold,
    toggleItalic,
    toggleStrike,
    // State helpers
    isActive,
    // Editor availability
    isReady: !!editor,
  }
}
