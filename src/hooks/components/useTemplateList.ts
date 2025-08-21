import { useState, useCallback, useEffect } from 'react'
import { TemplateTypeMapper } from '../../interfaces/mappersInterface'
import { useDocumentsApi } from '../api/apiWithAuth/useDocumentsApi'
import { ErrorHandler } from '../../utils/ErrorHandler'
import { AppError } from '../../interfaces/configInterface'
import { showToastifyError } from '../../utils/showToastify'
import { Template } from '../../interfaces/apiResponsesInterface'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { deletePreviewDocument, savePreviewDocument } from '../../redux/actions'

export const useTemplateList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [templateTypes, setTemplateTypes] = useState<TemplateTypeMapper[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  // Loading state
  const [loading, setLoading] = useState<boolean>(false)
  // Preview state
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const navigate = useNavigate()

  const itemsPerPage = 9
  // HOOKS
  const { isLoading, error, getTemplateTypes, getTemplates } = useDocumentsApi()

  // REDUX
  const dispatchPD = useDispatch()

  // USE EFFECT
  useEffect(() => {
    if (previewTemplate) {
      dispatchPD(
        savePreviewDocument({
          id: previewTemplate.id.toString(),
          preview: previewTemplate.html_con_campos || '',
          type: 'template',
          name: previewTemplate.nombre || '',
          fields: previewTemplate.campos_asociados || [],
        })
      )
    } else {
      dispatchPD(deletePreviewDocument(null))
    }
  }, [previewTemplate])

  // CALLS API
  const firstLoad = async () => {
    setLoading(true)
    await Promise.all([loadTemplateTypesData(), loadTemplateData()])
    setLoading(false)
  }

  const loadTemplateData = async () => {
    const response = await getTemplates()
    if (response?.data?.data) {
      setTemplates(Array.isArray(response.data.data) ? response.data.data : [])
    }
  }

  const loadTemplateTypesData = async () => {
    const response = await getTemplateTypes()
    if (response?.data?.data?.results) {
      setTemplateTypes(response.data.data.results)
    }
  }

  useEffect(() => {
    if (error) {
      ErrorHandler.logError(error as AppError)
      showToastifyError(error.details.errors[0])
    }
  }, [error])

  useEffect(() => {
    firstLoad()
  }, [])

  const filteredTemplates = (templates: Template[]) =>
    templates.filter((template: Template) => {
      const matchesSearch = template.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType =
        filterType === 'all' || template.tipo?.nombre.includes(filterType)
      return matchesSearch && matchesType
    })

  // Paginación
  const getPaginatedTemplates = (templates: Template[]) => {
    const filtered = filteredTemplates(templates)
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)
    return { paginated, totalPages }
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleEditTemplate = (template: any) => {
    console.log('Editando plantilla:', template)
    // Aquí iría la lógica para editar la plantilla
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Eliminando plantilla:', templateId)
    // Aquí iría la lógica para eliminar la plantilla
  }

  const handleDownloadTemplate = (template: any) => {
    console.log('Descargando plantilla:', template)
    // Aquí iría la lógica para descargar la plantilla
  }

  const handlePreviewTemplate = (template: Template) => {
    console.log('Vista previa de plantilla:', template)
    setPreviewTemplate(template)
    setPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewTemplate(null)
  }

  const handleToggleFavorite = (templateId: number) => {
    console.log('Toggling favorite for template:', templateId)
    // Aquí iría la lógica para agregar/quitar de favoritos
    // Por ahora solo actualiza el estado local
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === templateId
          ? { ...template, es_favorito: !template.es_favorito }
          : template
      )
    )
  }

  return {
    currentPage,
    filteredTemplates,
    filterType,
    getPaginatedTemplates,
    handlePageChange,
    itemsPerPage,
    loading,
    searchTerm,
    setCurrentPage,
    setFilterType,
    setSearchTerm,
    setTemplateTypes,
    templates,
    templateTypes,
    handleEditTemplate,
    handleDeleteTemplate,
    handleDownloadTemplate,
    handlePreviewTemplate,
    handleClosePreview,
    handleToggleFavorite,
    previewOpen,
    previewTemplate,
    previewLoading,
    navigate,
  }
}
