import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDocumentsApi } from '../../hooks/api/apiWithAuth/useDocumentsApi'
import { UploadedDocument } from '../../interfaces/apiResponsesInterface'

export const useUploadedDocuments = () => {
  // USE STATE AND HOOKS
  const { getUploadedDocuments, removeUploadedDocument } = useDocumentsApi()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<UploadedDocument | null>(null)
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [previewLoading, setPreviewLoading] = useState(false)
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 9
  const navigate = useNavigate()

  // USE EFFECT
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true)
      try {
        const response = await getUploadedDocuments()
        if (response?.data?.data) {
          setDocuments(
            Array.isArray(response.data.data) ? response.data.data : []
          )
        }
      } catch (err) {
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [])

  // Eliminar documento
  const handleDeleteDocument = async (id: number) => {
    setLoading(true)
    try {
      await removeUploadedDocument(id)
      setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    } catch (err) {
      // Podrías mostrar un error aquí si lo deseas
    } finally {
      setLoading(false)
    }
  }

  // Previsualizar documento
  const handlePreviewDocument = async (doc: UploadedDocument) => {
    setPreviewDoc(doc)
    setPreviewLoading(true)
    setPreviewOpen(true)
    // Simulación: Si el documento es texto, se obtiene el contenido, si es PDF/imagen se muestra un mensaje
    try {
      if (doc.tipo === 'texto') {
        const response = await fetch(doc.archivo_url)
        const text = await response.text()
        setPreviewHtml(`<pre>${text}</pre>`)
      } else if (doc.tipo === 'pdf') {
        setPreviewHtml(
          '<div>Previsualización de PDF no soportada. <a href="' +
            doc.archivo_url +
            '" target="_blank">Abrir PDF</a></div>'
        )
      } else if (doc.tipo === 'imagen') {
        setPreviewHtml(
          '<img src="' +
            doc.archivo_url +
            '" alt="Imagen" style="max-width:100%;max-height:400px;" />'
        )
      } else {
        setPreviewHtml(
          '<div>No se puede previsualizar este tipo de archivo.</div>'
        )
      }
    } catch (err) {
      setPreviewHtml('<div>Error al cargar la previsualización.</div>')
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewDoc(null)
    setPreviewHtml('')
  }

  // Filtros
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.nombre_original
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || doc.tipo === filterType
    return matchesSearch && matchesType
  })

  // Paginación
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const getUniqueTypes = () => {
    const types = documents.map((doc) => doc.tipo)
    return [...new Set(types)]
  }

  return {
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
  }
}
