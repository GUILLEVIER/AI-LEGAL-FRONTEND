import { useState } from 'react'
import { useDocumentsApi } from '../hooks/api/apiWithAuth/useDocumentsApi'
import {
  UploadedDocument,
  AvailableField,
  Template,
  GeneratedDocument,
  TemplateType,
  UploadDocumentResponse,
  CreateTemplateResponse,
  GenerateDocumentResponse,
  FavoriteResponse,
} from '../interfaces/apiResponsesInterface'
import { CreateTemplateData } from '../hooks/api/apiWithAuth/useDocumentsApi'
import {
  AvailableFieldMapper,
  TemplateTypeMapper,
} from '../interfaces/mappersInterface'

/**
 * Ejemplo de componente que usa el hook useDocumentsApi
 * Prueba todos los métodos GET para verificar la conexión a la API
 */
export const ExampleComponentWithAuthUsingDocumentsApi: React.FC = () => {
  // Estados para cada método GET
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([])
  const [availableFields, setAvailableFields] = useState<
    AvailableFieldMapper[]
  >([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [singleTemplate, setSingleTemplate] = useState<Template | null>(null)
  const [generatedDocuments, setGeneratedDocuments] = useState<
    GeneratedDocument[]
  >([])
  const [singleGeneratedDocument, setSingleGeneratedDocument] =
    useState<GeneratedDocument | null>(null)
  const [myFavorites, setMyFavorites] = useState<Template[]>([])
  const [templateTypes, setTemplateTypes] = useState<TemplateTypeMapper[]>([])

  // Estados adicionales para métodos POST
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadResult, setUploadResult] =
    useState<UploadDocumentResponse | null>(null)
  const [newField, setNewField] = useState({
    nombre: '',
    tipo_dato: 'texto' as 'texto' | 'fecha' | 'numero',
  })
  const [fieldCreateResult, setFieldCreateResult] =
    useState<AvailableField | null>(null)
  const [newTemplate, setNewTemplate] = useState<CreateTemplateData>({
    nombre: '',
    descripcion: '',
    html_con_campos: '',
    tipo_id: undefined,
  })
  const [templateCreateResult, setTemplateCreateResult] =
    useState<CreateTemplateResponse | null>(null)
  const [generateDoc, setGenerateDoc] = useState<{
    templateId?: number
    dataJson: string
  }>({
    templateId: undefined,
    dataJson: '',
  })
  const [documentGenerateResult, setDocumentGenerateResult] =
    useState<GenerateDocumentResponse | null>(null)
  const [favoriteTemplateId, setFavoriteTemplateId] = useState<
    number | undefined
  >(undefined)
  const [favoriteResult, setFavoriteResult] = useState<FavoriteResponse | null>(
    null
  )

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
    // Estados adicionales para métodos POST
    uploadDoc: false,
    createField: false,
    createTemplate: false,
    generateDoc: false,
    addFavorite: false,
    removeFavorite: false,
    createTemplateType: false,
  })

  const {
    isLoading,
    error,
    getUploadedDocuments,
    getAvailableFields,
    getTemplates,
    getTemplate,
    getGeneratedDocuments,
    getGeneratedDocument,
    getMyFavorites,
    getTemplateTypes,
    // Métodos POST
    uploadDocument,
    createAvailableField,
    createTemplate,
    generateDocument,
    addFavorite,
    removeFavorite,
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
      if (response?.data?.data) {
        setUploadedDocuments(
          Array.isArray(response.data.data) ? response.data.data : []
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

  // Handlers para métodos POST
  const handleUploadDocument = async () => {
    if (!selectedFile) return
    setLoading('uploadDoc', true)
    try {
      const response = await uploadDocument(selectedFile)
      if (response?.data?.data) {
        setUploadResult(response.data.data)
      }
      console.log('Upload Document Response:', response)
    } catch (err) {
      console.error('Error uploading document:', err)
    } finally {
      setLoading('uploadDoc', false)
    }
  }

  const handleCreateAvailableField = async () => {
    setLoading('createField', true)
    try {
      const response = await createAvailableField(newField)
      if (response?.data?.data) {
        setFieldCreateResult(response.data.data)
        // Limpiar formulario
        setNewField({ nombre: '', tipo_dato: 'texto' })
      }
      console.log('Create Available Field Response:', response)
    } catch (err) {
      console.error('Error creating available field:', err)
    } finally {
      setLoading('createField', false)
    }
  }

  const handleCreateTemplate = async () => {
    setLoading('createTemplate', true)
    try {
      const response = await createTemplate(newTemplate)
      if (response?.data?.data) {
        setTemplateCreateResult(response.data.data)
        // Limpiar formulario
        setNewTemplate({
          nombre: '',
          descripcion: '',
          html_con_campos: '',
          tipo_id: undefined,
        })
      }
      console.log('Create Template Response:', response)
    } catch (err) {
      console.error('Error creating template:', err)
    } finally {
      setLoading('createTemplate', false)
    }
  }

  const handleGenerateDocument = async () => {
    if (!generateDoc.templateId || !generateDoc.dataJson) return
    setLoading('generateDoc', true)
    try {
      let parsedData: Record<string, any>
      try {
        parsedData = JSON.parse(generateDoc.dataJson)
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        alert('El formato JSON no es válido')
        return
      }

      const response = await generateDocument(
        generateDoc.templateId,
        parsedData
      )
      if (response?.data?.data) {
        setDocumentGenerateResult(response.data.data)
      }
      console.log('Generate Document Response:', response)
    } catch (err) {
      console.error('Error generating document:', err)
    } finally {
      setLoading('generateDoc', false)
    }
  }

  const handleAddFavorite = async () => {
    if (!favoriteTemplateId) return
    setLoading('addFavorite', true)
    try {
      const response = await addFavorite(favoriteTemplateId)
      if (response?.data?.data) {
        setFavoriteResult(response.data.data)
      }
      console.log('Add Favorite Response:', response)
    } catch (err) {
      console.error('Error adding favorite:', err)
    } finally {
      setLoading('addFavorite', false)
    }
  }

  const handleRemoveFavorite = async () => {
    if (!favoriteTemplateId) return
    setLoading('removeFavorite', true)
    try {
      const response = await removeFavorite(favoriteTemplateId)
      if (response?.data?.data) {
        setFavoriteResult(response.data.data)
      }
      console.log('Remove Favorite Response:', response)
    } catch (err) {
      console.error('Error removing favorite:', err)
    } finally {
      setLoading('removeFavorite', false)
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
                    <strong>Nombre:</strong> {field.name}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {field.dataType}
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
          <h3>6. Documento Generado Individual (ID: 3)</h3>
          <button
            onClick={() => handleGetGeneratedDocument(3)}
            disabled={loadingStates.singleGeneratedDoc}
          >
            {loadingStates.singleGeneratedDoc
              ? 'Cargando...'
              : 'Obtener Documento Generado ID 3'}
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
                    <strong>Nombre:</strong> {type.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <h1>Ejemplo de useDocumentsApi - Métodos POSTS</h1>

      {/* Estados adicionales para métodos POST */}
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {/* Upload Document */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>1. Subir Documento</h3>
          <input
            type='file'
            accept='.pdf,.jpg,.jpeg,.png,.txt'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setSelectedFile(file)
            }}
            style={{ marginBottom: '10px' }}
          />
          {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
          <button
            onClick={handleUploadDocument}
            disabled={loadingStates.uploadDoc || !selectedFile}
            style={{ marginLeft: '10px' }}
          >
            {loadingStates.uploadDoc ? 'Subiendo...' : 'Subir Documento'}
          </button>
          {uploadResult && (
            <div
              style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>Documento subido exitosamente!</strong>
              </p>
              <p>
                <strong>ID:</strong> {uploadResult.id}
              </p>
              <p>
                <strong>Tipo:</strong> {uploadResult.tipo}
              </p>
              <p>
                <strong>Nombre:</strong> {uploadResult.nombre_original}
              </p>
              <p>
                <strong>URL del archivo:</strong> {uploadResult.archivo_url}
              </p>
              <p>
                <strong>Fecha de subida:</strong> {uploadResult.fecha_subida}
              </p>
              {uploadResult.texto_extraido && (
                <p>
                  <strong>Texto extraído:</strong>{' '}
                  {uploadResult.texto_extraido.substring(0, 100)}...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Create Available Field */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>2. Crear Campo Disponible</h3>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
            <input
              type='text'
              placeholder='Nombre del campo'
              value={newField.nombre}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, nombre: e.target.value }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            />
            <select
              value={newField.tipo_dato}
              onChange={(e) =>
                setNewField((prev) => ({
                  ...prev,
                  tipo_dato: e.target.value as 'texto' | 'fecha' | 'numero',
                }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            >
              <option value='texto'>Texto</option>
              <option value='fecha'>Fecha</option>
              <option value='numero'>Número</option>
            </select>
          </div>
          <button
            onClick={handleCreateAvailableField}
            disabled={loadingStates.createField || !newField.nombre}
          >
            {loadingStates.createField ? 'Creando...' : 'Crear Campo'}
          </button>
          {fieldCreateResult && (
            <div
              style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>Campo creado exitosamente!</strong>
              </p>
              <p>
                <strong>ID:</strong> {fieldCreateResult.id}
              </p>
              <p>
                <strong>Nombre:</strong> {fieldCreateResult.nombre}
              </p>
              <p>
                <strong>Tipo:</strong> {fieldCreateResult.tipo_dato}
              </p>
            </div>
          )}
        </div>

        {/* Create Template */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>3. Crear Plantilla</h3>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
            <input
              type='text'
              placeholder='Nombre de la plantilla'
              value={newTemplate.nombre}
              onChange={(e) =>
                setNewTemplate((prev) => ({ ...prev, nombre: e.target.value }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            />
            <textarea
              placeholder='Descripción (opcional)'
              value={newTemplate.descripcion}
              onChange={(e) =>
                setNewTemplate((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
              rows={3}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            />
            <textarea
              placeholder='HTML con campos (ej: <p>Hola {{nombre}}</p>)'
              value={newTemplate.html_con_campos}
              onChange={(e) =>
                setNewTemplate((prev) => ({
                  ...prev,
                  html_con_campos: e.target.value,
                }))
              }
              rows={4}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            />
            <select
              value={newTemplate.tipo_id || ''}
              onChange={(e) =>
                setNewTemplate((prev) => ({
                  ...prev,
                  tipo_id: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            >
              <option value=''>Seleccionar tipo (opcional)</option>
              {templateTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (ID: {type.id})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCreateTemplate}
            disabled={
              loadingStates.createTemplate ||
              !newTemplate.nombre ||
              !newTemplate.html_con_campos
            }
          >
            {loadingStates.createTemplate ? 'Creando...' : 'Crear Plantilla'}
          </button>
          {templateCreateResult && (
            <div
              style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>Plantilla creada exitosamente!</strong>
              </p>
              <p>
                <strong>ID:</strong> {templateCreateResult.id}
              </p>
            </div>
          )}
        </div>

        {/* Generate Document */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>4. Generar Documento</h3>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
            <select
              value={generateDoc.templateId || ''}
              onChange={(e) =>
                setGenerateDoc((prev) => ({
                  ...prev,
                  templateId: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            >
              <option value=''>Seleccionar plantilla</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.nombre} (ID: {template.id})
                </option>
              ))}
            </select>
            <textarea
              placeholder='Datos JSON (ej: {"nombre": "Juan", "fecha": "2024-01-01"})'
              value={generateDoc.dataJson}
              onChange={(e) =>
                setGenerateDoc((prev) => ({
                  ...prev,
                  dataJson: e.target.value,
                }))
              }
              rows={4}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
            />
          </div>
          <button
            onClick={handleGenerateDocument}
            disabled={
              loadingStates.generateDoc ||
              !generateDoc.templateId ||
              !generateDoc.dataJson
            }
          >
            {loadingStates.generateDoc ? 'Generando...' : 'Generar Documento'}
          </button>
          {documentGenerateResult && (
            <div
              style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>Documento generado exitosamente!</strong>
              </p>
              <p>
                <strong>ID:</strong> {documentGenerateResult.id}
              </p>
              <details style={{ marginTop: '10px' }}>
                <summary>Ver HTML generado</summary>
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    marginTop: '5px',
                    maxHeight: '200px',
                    overflow: 'auto',
                  }}
                >
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                    {documentGenerateResult.html_resultante}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Add to Favorites */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>5. Agregar a Favoritos</h3>
          <select
            value={favoriteTemplateId || ''}
            onChange={(e) =>
              setFavoriteTemplateId(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              marginBottom: '10px',
            }}
          >
            <option value=''>Seleccionar plantilla para favoritos</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.nombre} (ID: {template.id})
              </option>
            ))}
          </select>
          <br />
          <button
            onClick={handleAddFavorite}
            disabled={loadingStates.addFavorite || !favoriteTemplateId}
            style={{ marginRight: '10px' }}
          >
            {loadingStates.addFavorite ? 'Agregando...' : 'Agregar a Favoritos'}
          </button>
          <button
            onClick={handleRemoveFavorite}
            disabled={loadingStates.removeFavorite || !favoriteTemplateId}
          >
            {loadingStates.removeFavorite
              ? 'Removiendo...'
              : 'Remover de Favoritos'}
          </button>
          {favoriteResult && (
            <div
              style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>Operación de favoritos exitosa!</strong>
              </p>
              <p>
                <strong>ID:</strong> {favoriteResult.id}
              </p>
              <p>
                <strong>Plantilla:</strong> {favoriteResult.plantilla.id}
              </p>
              <p>
                <strong>Fecha Agregado:</strong> {favoriteResult.fecha_agregado}
              </p>
              <p>
                <strong>Usuario:</strong> {favoriteResult.usuario}
              </p>
            </div>
          )}
        </div>
      </div>

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
