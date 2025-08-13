import {
  UploadDocumentResponse,
  UploadedDocument,
  AvailableFieldsResponse,
  AvailableField,
  CreateAvailableFieldResponse,
  Template,
  CreateTemplateResponse,
  GenerateDocumentResponse,
  GeneratedDocumentsResponse,
  GeneratedDocument,
  FavoriteResponse,
  MyFavoritesResponse,
  TemplateTypesResponse,
  TemplateType,
  CreateTemplateTypeResponse,
  UploadedDocumentsResponse,
} from '../../../interfaces/apiResponsesInterface'
import { useApiWithAuth } from '../../utils/useApiWithAuth'

// REVISAR CON PRECAUCIÓN
/**
 * Interface for creating template data
 */
export interface CreateTemplateData {
  nombre: string
  descripcion?: string
  html_con_campos: string
  tipo_id?: number
  campos?: Array<{
    campo_id: number
    nombre_variable: string
  }>
}

/**
 * API calls for document management
 * Aquí se llamarán las funciones para manejar documentos en la API.
 */
export const useDocumentsApi = () => {
  const { getWithAuth, postWithAuth, deleteWithAuth } = useApiWithAuth()

  // Documentos subidos
  const uploadDocument = async (file: File) => {
    const formData = new FormData()
    console.log('archivo: ', file)
    formData.append('archivo', file)

    const response = await postWithAuth<UploadDocumentResponse>(
      '/documents/v1/documentos-subidos/subir_documento/',
      formData
    )
    return response
  }

  // PROBADO
  const getUploadedDocuments = async () => {
    const response = await getWithAuth<UploadedDocumentsResponse>(
      '/documents/v1/documentos-subidos/'
    )
    return response
  }

  // Campos disponibles
  // PROBADO
  const getAvailableFields = async () => {
    const response = await getWithAuth<AvailableFieldsResponse>(
      '/documents/v1/campos-disponibles/'
    )
    return response
  }

  const createAvailableField = async (field: Omit<AvailableField, 'id'>) => {
    const response = await postWithAuth<CreateAvailableFieldResponse>(
      '/documents/v1/campos-disponibles/',
      field
    )
    return response
  }

  // Plantillas
  // PROBADO
  const getTemplates = async () => {
    const response = await getWithAuth<Template[]>(
      '/documents/v1/plantillas-documentos/'
    )
    return response
  }

  const createTemplate = async (templateData: CreateTemplateData) => {
    const response = await postWithAuth<CreateTemplateResponse>(
      '/documents/v1/plantillas-documentos/crear_plantilla/',
      templateData
    )
    return response
  }

  const duplicateTemplate = async (templateData: CreateTemplateData) => {
    const response = await postWithAuth<Template>(
      '/documents/v1/plantillas-documentos/crear_plantilla/',
      templateData
    )
    return response
  }

  // PROBADO
  const getTemplate = async (id: number) => {
    const response = await getWithAuth<Template>(
      `/documents/v1/plantillas-documentos/${id}/`
    )
    return response
  }

  const generateDocument = async (
    templateId: number,
    data: Record<string, any>
  ) => {
    const response = await postWithAuth<GenerateDocumentResponse>(
      `/documents/v1/plantillas-documentos/${templateId}/generar_documento/`,
      {
        plantilla_id: templateId,
        datos: data,
      }
    )
    console.log(response)
    return response
  }

  // Documentos generados
  // FALTA PROBAR CON DATOS
  const getGeneratedDocuments = async () => {
    const response = await getWithAuth<GeneratedDocumentsResponse>(
      '/documents/v1/documentos-generados/'
    )
    if (response && response.data && response.data.data) {
      console.log('getGeneratedDocuments: ', response.data.data.results)
    }
    return response
  }

  // FALTA PROBAR CON DATOS
  const getGeneratedDocument = async (id: number) => {
    const response = await getWithAuth<GeneratedDocument>(
      `/documents/v1/documentos-generados/${id}/`
    )
    return response
  }

  // Favoritos
  const addFavorite = async (templateId: number) => {
    const response = await postWithAuth<FavoriteResponse>(
      '/documents/v1/plantillas-favoritas/agregar_favorito/',
      { plantilla_id: templateId }
    )
    return response
  }

  const removeFavorite = async (templateId: number) => {
    const response = await deleteWithAuth<FavoriteResponse>(
      '/documents/v1/plantillas-favoritas/quitar_favorito/',
      {
        'Content-Type': 'application/json',
      },
      { plantilla_id: templateId }
    )
    return response
  }

  // FALTA PROBAR CON DATOS
  const getMyFavorites = async () => {
    const response = await getWithAuth<Template[]>(
      '/documents/v1/plantillas-favoritas/mis_favoritos/'
    )
    return response
  }

  // Tipos de plantilla
  // PROBADO
  const getTemplateTypes = async () => {
    const response = await getWithAuth<TemplateTypesResponse>(
      '/documents/v1/tipos-plantilla/'
    )
    return response
  }

  const createTemplateType = async (type: Omit<TemplateType, 'id'>) => {
    const response = await postWithAuth<CreateTemplateTypeResponse>(
      '/documents/v1/tipos-plantilla/',
      type
    )
    return response
  }

  return {
    uploadDocument,
    getUploadedDocuments,
    getAvailableFields,
    createAvailableField,
    getTemplates,
    createTemplate,
    duplicateTemplate,
    getTemplate,
    generateDocument,
    getGeneratedDocuments,
    getGeneratedDocument,
    addFavorite,
    removeFavorite,
    getMyFavorites,
    getTemplateTypes,
    createTemplateType,
  }
}
