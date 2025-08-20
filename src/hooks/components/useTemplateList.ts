import { useState } from 'react'
import { Template } from '../../interfaces/propsInterface'

export const useTemplateList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filtros
  const filteredTemplates = (templates: Template[]) =>
    templates.filter((template: Template) => {
      const matchesSearch = template.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType =
        filterType === 'all' || template.type.includes(filterType)
      const matchesStatus =
        filterStatus === 'all' || template.status === filterStatus

      return matchesSearch && matchesType && matchesStatus
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

  const getUniqueTypes = (templates: Template[]) => {
    const types = templates.map((template: Template) => template.type)
    return [...new Set(types)]
  }

  return {
    searchTerm,
    filterType,
    filterStatus,
    currentPage,
    itemsPerPage,
    filteredTemplates,
    getPaginatedTemplates,
    handlePageChange,
    getUniqueTypes,
    setSearchTerm,
    setFilterType,
    setFilterStatus,
    setCurrentPage,
  }
}
