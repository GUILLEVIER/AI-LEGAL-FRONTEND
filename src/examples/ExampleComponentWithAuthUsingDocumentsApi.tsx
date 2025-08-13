import { useState } from 'react'
import { useDocumentsApi } from '../hooks/api/apiWithAuth/useDocumentsApi'
import { useApiWithAuth } from '../hooks/utils/useApiWithAuth'
import {
  UploadedDocument,
  AvailableField,
  Template,
  GeneratedDocument,
  TemplateType,
} from '../interfaces/apiResponsesInterface'

/**
 * Ejemplo de componente que usa el hook useDocumentsApi
 * Prueba todos los métodos GET para verificar la conexión a la API
 */
export const ExampleComponentWithAuthUsingDocumentsApi: React.FC = () => {
  const { isLoading, error } = useApiWithAuth()

  // Estados para cada método GET
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([])
  const [availableFields, setAvailableFields] = useState<AvailableField[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [singleTemplate, setSingleTemplate] = useState<Template | null>(null)
  const [generatedDocuments, setGeneratedDocuments] = useState<
    GeneratedDocument[]
  >([])
  const [singleGeneratedDocument, setSingleGeneratedDocument] =
    useState<GeneratedDocument | null>(null)
  const [myFavorites, setMyFavorites] = useState<Template[]>([])
  const [templateTypes, setTemplateTypes] = useState<TemplateType[]>([])

  // Estados para controlar la carga de cada operación
  const [loadingStates, setLoadingStates] = useState({
    uploadedDocs: false,
    availableFields: false,
    templates: false,
    singleTemplate: false,
    generatedDocs: false,
    singleGeneratedDoc: false,
    favorites: false,
    templateTypes: false,
  })

  const {
    getUploadedDocuments,
    getAvailableFields,
    getTemplates,
    getTemplate,
    getGeneratedDocuments,
    getGeneratedDocument,
    getMyFavorites,
    getTemplateTypes,
  } = useDocumentsApi()

  // Función para actualizar estado de carga
  const setLoading = (key: keyof typeof loadingStates, value: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }))
  }

  // Handlers para cada método GET
  const handleGetUploadedDocuments = async () => {
    setLoading('uploadedDocs', true)
    try {
      const response = await getUploadedDocuments()
      if (response?.data?.data?.results) {
        setUploadedDocuments(
          Array.isArray(response.data.data.results)
            ? response.data.data.results
            : []
        )
      }
      console.log('Uploaded Documents Response:', response)
    } catch (err) {
      console.error('Error getting uploaded documents:', err)
    } finally {
      setLoading('uploadedDocs', false)
    }
  }

  const handleGetAvailableFields = async () => {
    setLoading('availableFields', true)
    try {
      const response = await getAvailableFields()
      if (response?.data?.data?.results) {
        setAvailableFields(response.data.data.results)
      }
      console.log('Available Fields Response:', response)
    } catch (err) {
      console.error('Error getting available fields:', err)
    } finally {
      setLoading('availableFields', false)
    }
  }

  const handleGetTemplates = async () => {
    setLoading('templates', true)
    try {
      const response = await getTemplates()
      if (response?.data?.data) {
        setTemplates(
          Array.isArray(response.data.data) ? response.data.data : []
        )
      }
      console.log('Templates Response:', response)
    } catch (err) {
      console.error('Error getting templates:', err)
    } finally {
      setLoading('templates', false)
    }
  }

  const handleGetTemplate = async (id: number = 1) => {
    setLoading('singleTemplate', true)
    try {
      const response = await getTemplate(id)
      if (response?.data?.data) {
        setSingleTemplate(response.data.data)
      }
      console.log('Single Template Response:', response)
    } catch (err) {
      console.error('Error getting template:', err)
    } finally {
      setLoading('singleTemplate', false)
    }
  }

  const handleGetGeneratedDocuments = async () => {
    setLoading('generatedDocs', true)
    try {
      const response = await getGeneratedDocuments()
      if (response?.data?.data?.results) {
        setGeneratedDocuments(response.data.data.results)
      }
      console.log('Generated Documents Response:', response)
    } catch (err) {
      console.error('Error getting generated documents:', err)
    } finally {
      setLoading('generatedDocs', false)
    }
  }

  const handleGetGeneratedDocument = async (id: number = 1) => {
    setLoading('singleGeneratedDoc', true)
    try {
      const response = await getGeneratedDocument(id)
      if (response?.data?.data) {
        setSingleGeneratedDocument(response.data.data)
      }
      console.log('Single Generated Document Response:', response)
    } catch (err) {
      console.error('Error getting generated document:', err)
    } finally {
      setLoading('singleGeneratedDoc', false)
    }
  }

  const handleGetMyFavorites = async () => {
    setLoading('favorites', true)
    try {
      const response = await getMyFavorites()
      if (response?.data?.data) {
        setMyFavorites(
          Array.isArray(response.data.data) ? response.data.data : []
        )
      }
      console.log('My Favorites Response:', response)
    } catch (err) {
      console.error('Error getting favorites:', err)
    } finally {
      setLoading('favorites', false)
    }
  }

  const handleGetTemplateTypes = async () => {
    setLoading('templateTypes', true)
    try {
      const response = await getTemplateTypes()
      if (response?.data?.data?.results) {
        setTemplateTypes(response.data.data.results)
      }
      console.log('Template Types Response:', response)
    } catch (err) {
      console.error('Error getting template types:', err)
    } finally {
      setLoading('templateTypes', false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ejemplo de useDocumentsApi - Métodos GET</h1>

      {isLoading && <p style={{ color: 'blue' }}>Validando autenticación...</p>}
      {error && (
        <p style={{ color: 'red' }}>Error de autenticación: {error.message}</p>
      )}

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {/* Documentos Subidos */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>1. Documentos Subidos</h3>
          <button
            onClick={handleGetUploadedDocuments}
            disabled={loadingStates.uploadedDocs}
          >
            {loadingStates.uploadedDocs
              ? 'Cargando...'
              : 'Obtener Documentos Subidos'}
          </button>
          {uploadedDocuments.length > 0 && (
            <div>
              <h4>Resultados ({uploadedDocuments.length}):</h4>
              {uploadedDocuments.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {doc.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {doc.nombre_original}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {doc.tipo}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {doc.fecha_subida}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Campos Disponibles */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>2. Campos Disponibles</h3>
          <button
            onClick={handleGetAvailableFields}
            disabled={loadingStates.availableFields}
          >
            {loadingStates.availableFields
              ? 'Cargando...'
              : 'Obtener Campos Disponibles'}
          </button>
          {availableFields.length > 0 && (
            <div>
              <h4>Resultados ({availableFields.length}):</h4>
              {availableFields.slice(0, 5).map((field) => (
                <div
                  key={field.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {field.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {field.nombre}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {field.tipo_dato}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plantillas */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>3. Plantillas</h3>
          <button
            onClick={handleGetTemplates}
            disabled={loadingStates.templates}
          >
            {loadingStates.templates ? 'Cargando...' : 'Obtener Plantillas'}
          </button>
          {templates.length > 0 && (
            <div>
              <h4>Resultados ({templates.length}):</h4>
              {templates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {template.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {template.nombre}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {template.descripcion}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {template.fecha_creacion}
                  </p>
                  <p>
                    <strong>Campos asociados:</strong>{' '}
                    {template.campos_asociados?.length || 0}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plantilla Individual */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>4. Plantilla Individual (ID: 1)</h3>
          <button
            onClick={() => handleGetTemplate(1)}
            disabled={loadingStates.singleTemplate}
          >
            {loadingStates.singleTemplate
              ? 'Cargando...'
              : 'Obtener Plantilla ID 1'}
          </button>
          {singleTemplate && (
            <div
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                margin: '5px',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>ID:</strong> {singleTemplate.id}
              </p>
              <p>
                <strong>Nombre:</strong> {singleTemplate.nombre}
              </p>
              <p>
                <strong>Descripción:</strong> {singleTemplate.descripcion}
              </p>
              <p>
                <strong>Usuario:</strong> {singleTemplate.usuario}
              </p>
              <p>
                <strong>Favorito:</strong>{' '}
                {singleTemplate.es_favorito ? 'Sí' : 'No'}
              </p>
            </div>
          )}
        </div>

        {/* Documentos Generados */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>5. Documentos Generados</h3>
          <button
            onClick={handleGetGeneratedDocuments}
            disabled={loadingStates.generatedDocs}
          >
            {loadingStates.generatedDocs
              ? 'Cargando...'
              : 'Obtener Documentos Generados'}
          </button>
          {generatedDocuments.length > 0 && (
            <div>
              <h4>Resultados ({generatedDocuments.length}):</h4>
              {generatedDocuments.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {doc.id}
                  </p>
                  <p>
                    <strong>Plantilla:</strong> {doc.plantilla_nombre}
                  </p>
                  <p>
                    <strong>Usuario:</strong> {doc.usuario_username}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {doc.fecha_generacion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documento Generado Individual */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>6. Documento Generado Individual (ID: 1)</h3>
          <button
            onClick={() => handleGetGeneratedDocument(1)}
            disabled={loadingStates.singleGeneratedDoc}
          >
            {loadingStates.singleGeneratedDoc
              ? 'Cargando...'
              : 'Obtener Documento Generado ID 1'}
          </button>
          {singleGeneratedDocument && (
            <div
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                margin: '5px',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>ID:</strong> {singleGeneratedDocument.id}
              </p>
              <p>
                <strong>Plantilla:</strong>{' '}
                {singleGeneratedDocument.plantilla_nombre}
              </p>
              <p>
                <strong>Usuario:</strong>{' '}
                {singleGeneratedDocument.usuario_username}
              </p>
              <p>
                <strong>Fecha:</strong>{' '}
                {singleGeneratedDocument.fecha_generacion}
              </p>
            </div>
          )}
        </div>

        {/* Mis Favoritos */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>7. Mis Favoritos</h3>
          <button
            onClick={handleGetMyFavorites}
            disabled={loadingStates.favorites}
          >
            {loadingStates.favorites ? 'Cargando...' : 'Obtener Mis Favoritos'}
          </button>
          {myFavorites.length > 0 && (
            <div>
              <h4>Resultados ({myFavorites.length}):</h4>
              {myFavorites.slice(0, 3).map((favorite) => (
                <div
                  key={favorite.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {favorite.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {favorite.nombre}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {favorite.descripcion}
                  </p>
                  <p>
                    <strong>Fecha agregado:</strong>{' '}
                    {favorite.fecha_agregado_favorito}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tipos de Plantilla */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>8. Tipos de Plantilla</h3>
          <button
            onClick={handleGetTemplateTypes}
            disabled={loadingStates.templateTypes}
          >
            {loadingStates.templateTypes
              ? 'Cargando...'
              : 'Obtener Tipos de Plantilla'}
          </button>
          {templateTypes.length > 0 && (
            <div>
              <h4>Resultados ({templateTypes.length}):</h4>
              {templateTypes.map((type) => (
                <div
                  key={type.id}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '3px',
                  }}
                >
                  <p>
                    <strong>ID:</strong> {type.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {type.nombre}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <h1>Ejemplo de useDocumentsApi - Métodos POSTS</h1>

      {/* Instrucciones */}
      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
        }}
      >
        <h3>Instrucciones de Prueba:</h3>
        <ul>
          <li>Haz clic en cada botón para probar la conexión con la API</li>
          <li>Los resultados se mostrarán debajo de cada botón</li>
          <li>
            Revisa la consola del navegador para ver las respuestas completas de
            la API
          </li>
          <li>
            Si hay errores, aparecerán en la consola y te ayudarán a identificar
            problemas
          </li>
        </ul>
      </div>
    </div>
  )
}
