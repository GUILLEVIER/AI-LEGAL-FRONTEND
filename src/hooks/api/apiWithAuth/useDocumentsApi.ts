import {
  UploadDocumentResponse,
  UploadedDocument,
  AvailableFieldsResponse,
  AvailableField,
  Template,
  CreateTemplateResponse,
  GenerateDocumentResponse,
  GeneratedDocumentsResponse,
  GeneratedDocument,
  FavoriteResponse,
  TemplateTypesResponse,
} from '../../../interfaces/apiResponsesInterface'
import {
  AvailableFieldMapper,
  AvailableFieldsResponseMapper,
  TemplateTypesResponseMapper,
} from '../../../interfaces/mappersInterface'
import { DocumentsMapper } from '../../../mapper/DocumentsMapper'
import { useApiWithAuth } from '../../utils/useApiWithAuth'

/**
 * API calls for document management
 * Aquí se llamarán las funciones para manejar documentos en la API.
 */
export const useDocumentsApi = () => {
  const { isLoading, error, getWithAuth, postWithAuth, deleteWithAuth } =
    useApiWithAuth()

  // Documentos subidos
  // PROBADO
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
    const response = await getWithAuth<UploadedDocument[]>(
      '/documents/v1/documentos-subidos/'
    )
    return response
  }

  const removeUploadedDocument = async (id: number) => {
    const response = await deleteWithAuth<UploadDocumentResponse>(
      `/documents/v1/documentos-subidos/${id}/`
    )
    return response
  }

  // Campos disponibles
  // PROBADO
  const getAvailableFields = async () => {
    const response = await getWithAuth<AvailableFieldsResponse>(
      '/documents/v1/campos-disponibles/'
    )
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: DocumentsMapper.fromApiGetAvailableFields(response.data.data),
        },
      } as {
        data: {
          data: AvailableFieldsResponseMapper
        }
      }
    }
    return null
  }

  // PROBADO
  const createAvailableField = async (field: Omit<AvailableField, 'id'>) => {
    const response = await postWithAuth<AvailableField>(
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

  // PROBADO
  const createTemplate = async (templateData: any) => {
    const response = await postWithAuth<CreateTemplateResponse>(
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

  // PROBADO
  const generateDocument = async (
    templateId: number,
    data: Record<string, any>
  ) => {
    const response = await postWithAuth<GenerateDocumentResponse>(
      `/documents/v1/plantillas-documentos/${templateId}/generar_documento/`,
      data
    )
    console.log(response)
    return response
  }

  // Documentos generados
  // PROBADO
  const getGeneratedDocuments = async () => {
    const response = await getWithAuth<GeneratedDocumentsResponse>(
      '/documents/v1/documentos-generados/'
    )
    if (response && response.data && response.data.data) {
      console.log('getGeneratedDocuments: ', response.data.data.results)
    }
    return response
  }

  // PROBADO
  const getGeneratedDocument = async (id: number) => {
    const response = await getWithAuth<GeneratedDocument>(
      `/documents/v1/documentos-generados/${id}/`
    )
    return response
  }

  // Favoritos
  // PROBADO
  const addFavorite = async (templateId: number) => {
    const response = await postWithAuth<FavoriteResponse>(
      '/documents/v1/plantillas-favoritas/agregar_favorito/',
      { plantilla_id: templateId }
    )
    return response
  }

  // PROBADO
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

  // PROBADO
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
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: DocumentsMapper.fromApiGetTemplateTypes(response.data.data),
        },
      } as {
        data: {
          data: TemplateTypesResponseMapper
        }
      }
    }
    return null
  }

  // Tipos de categoría de plantilla
  const getTemplateCategories = async () => {
    const response = await getWithAuth<TemplateTypesResponse>(
      '/documents/v1/categorias-plantilla/'
    )
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: DocumentsMapper.fromApiGetTemplateTypes(response.data.data),
        },
      } as {
        data: {
          data: TemplateTypesResponseMapper
        }
      }
    }
    return null
  }

  // Tipos de clasificación de plantilla
  const getTemplateClassifications = async () => {
    const response = await getWithAuth<TemplateTypesResponse>(
      '/documents/v1/clasificacion-plantillas-generales/'
    )
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: DocumentsMapper.fromApiGetTemplateTypes(response.data.data),
        },
      } as {
        data: {
          data: TemplateTypesResponseMapper
        }
      }
    }
    return null
  }

  return {
    isLoading,
    error,
    uploadDocument,
    getUploadedDocuments,
    getAvailableFields,
    createAvailableField,
    getTemplates,
    createTemplate,
    getTemplate,
    generateDocument,
    getGeneratedDocuments,
    getGeneratedDocument,
    addFavorite,
    removeFavorite,
    getMyFavorites,
    getTemplateTypes,
    getTemplateCategories,
    getTemplateClassifications,
    removeUploadedDocument,
  }
}
