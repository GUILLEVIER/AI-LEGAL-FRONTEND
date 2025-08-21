import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDocumentsApi } from '../api/apiWithAuth/useDocumentsApi'
import { UploadedDocument } from '../../interfaces/apiResponsesInterface'
import { deletePreviewDocument, savePreviewDocument } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export const useUploadedDocumentsList = () => {
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

  // REDUX
  const dispatchPD = useDispatch()

  // USE EFFECT
  useEffect(() => {
    if (previewDoc) {
      dispatchPD(
        savePreviewDocument({
          id: previewDoc.id.toString(),
          preview: previewDoc.html || '',
          type: 'document',
          name: previewDoc.nombre_original || '',
        })
      )
    } else {
      dispatchPD(deletePreviewDocument(null))
    }
  }, [previewDoc])

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
  const handleDeleteDocument = async (documentId: number) => {
    setLoading(true)
    try {
      await removeUploadedDocument(documentId)
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
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
    setPreviewHtml(
      '<div style="overflow-wrap: break-word;">' +
        (doc.html || '<p>No hay vista previa disponible.</p>') +
        '</div>'
    )
    setPreviewLoading(false)
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewDoc(null)
    setPreviewHtml('')
  }

  // Filtros
  const filteredDocuments = (documents: UploadedDocument[]) =>
    documents.filter((doc) => {
      const matchesSearch = doc.nombre_original
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || doc.tipo === filterType
      return matchesSearch && matchesType
    })

  // Paginación
  const getPaginatedDocuments = (documents: UploadedDocument[]) => {
    const filtered = filteredDocuments(documents)
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)
    return { paginated, totalPages }
  }

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
    getPaginatedDocuments,
    setFilterType,
    currentPage,
    setCurrentPage,
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
