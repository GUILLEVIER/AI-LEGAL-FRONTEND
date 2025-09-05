import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDocumentsApi } from '../api/apiWithAuth/useDocumentsApi'
import { Template, TemplateField } from '@/interfaces/apiResponsesInterface'
import { AssignedField } from '@/interfaces/interactiveEditorInterface'
import { PreviewDocumentState } from '@/legal'
import { previewDocumentResult } from '@/redux/selectors'
import { UploadedFile } from '@/interfaces/propsInterface'
import { showToastifySuccess, showToastifyError } from '@/utils/showToastify'
import { useParams } from 'react-router'

/**
 * Custom hook for managing document generation functionality
 */
export const useDocumentGenerator = () => {
  // OBTENCIÓN DEL ID DE LA PLANTILLA DESDE LA URL
  const params = useParams()
  console.log('params: ', params)
  const templateId = params.templateId
  console.log('templateId: ', templateId)
  const { getTemplates, getTemplate, generateDocument, isLoading, error } =
    useDocumentsApi()

  // Get preview document from Redux
  /*
  const previewDocument: UploadedFile | null = useSelector(
    (state: PreviewDocumentState) => previewDocumentResult(state)
  )
  

  /*
  {
    "id": "9",
    "preview": "<div style='font-family: \"Times New Roman\", serif; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 20px; font-size: 13px;'>\n                <p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>EN LO PRINCIPAL: Señala nuevo domicilio. OTROSI: Exhorto</p>\n<p style='text-align: center; font-weight: bold; margin: 12px 0; font-size: 14px;'>SEÑOR JUEZ DE LETRAS DE VILLA ALEMANA</p>\n<p style='margin-left: 60px; text-align: justify; margin: 6px 0; line-height: 1.4;'>{{nombre_demandado}}</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>caratulados \"BANCO DEL ESTADO DE CHILE con JUAN MALDONADO\", causa Rol N°</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>C-123-123, SS. respetuosamente digo:</p>\n<p style='margin-left: 45px; text-align: justify; margin: 6px 0; line-height: 1.4;'>Que por esta presentación, vengo en señalar los nuevos domicilios del demandado,</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>los cuales corresponde a:</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>CALLE ANDO</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>CALLE ON</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>CALLE D</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>CALLE A</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>POR TANTO,</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>SOLICITO A SS., tener presente el nuevo domicilio de la parte demandada.</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>OTROSÍ: Que para notificar la demanda al ejecutado que tiene su domicilio fuera del</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>territorio jurisdiccional de SS, como asimismo para requerirlo de pago, trabar embargo sobre</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>sus bienes, requerir inscripciones de embargos y demás trámites pertinentes, sírvase SS.</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>disponer se exhorte al Tribunal de Viña, facultando al Tribunal exhortado para decretar la</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>forma de notificación prevista en el artículo 44 del Código de Procedimiento Civil, para</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>conceder el auxilio de la fuerza pública, con facultad de allanar y descerrajar en caso de</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>oposición al embargo, para disponer se certifique no se han opuesto excepciones y para</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>declarar la práctica de todas las diligencias y trámites necesarios para el cumplimiento del</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>exhorto, que contendrá copia íntegra de la demanda, proveído y notificaciones, copia del</p>\n<p style='margin-left: 15px; text-align: justify; margin: 6px 0; line-height: 1.4;'>mandamiento de ejecución y embargo y copia de esta presentación y proveído, realizando la</p>\n<p style='margin-left: 15px; text-align: left; margin: 6px 0; line-height: 1.4;'>gestión vía interconexión.</p>\n<p style='margin-left: 45px; text-align: justify; margin: 6px 0; line-height: 1.4;'>BancoEstado Cobranzas. Para consultas, llámenos desde celular al *2326 o al {{celular_cobranza_banco}}</p>\n<p style='text-align: left; margin: 6px 0; line-height: 1.4;'>{{asdasdasd}}</p>\n\n            </div>",
    "type": "template",
    "name": "Plantilla Demanda Ejemplo",
    "fields": [
        {
            "id": 9,
            "campo": 5,
            "nombre_variable": "asdasdasd",
            "campo_nombre": "Rol",
            "campo_tipo": "texto"
        },
        {
            "id": 10,
            "campo": 6,
            "nombre_variable": "nombre_demandado",
            "campo_nombre": "Tribunal",
            "campo_tipo": "texto"
        },
        {
            "id": 11,
            "campo": 8,
            "nombre_variable": "celular_cobranza_banco",
            "campo_nombre": "número_celular",
            "campo_tipo": "texto"
        }
    ],
    "responseId": 9
  }
  */

  // State for templates
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | ''>('')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const [loadingTemplate, setLoadingTemplate] = useState(false)
  const [loadingGenerate, setLoadingGenerate] = useState(false)
  const [initializationComplete, setInitializationComplete] = useState(false)

  // State for document generation
  const [documentName, setDocumentName] = useState('')
  const [previewData, setPreviewData] = useState<Record<string, string>>({})
  console.log('previewData', previewData)

  // Initialize component based on Redux data or URL params
  useEffect(() => {
    initializeDocumentGenerator()
  }, [templateId])

  // Load templates on hook initialization
  useEffect(() => {
    if (
      initializationComplete &&
      !selectedTemplate &&
      !templateId
      //!previewDocument
    ) {
      loadTemplates()
    }
  }, [initializationComplete, selectedTemplate, templateId])

  const initializeDocumentGenerator = async () => {
    try {
      // Priority 1: Check if we have a preview document in Redux
      /*
      if (previewDocument) {
        await loadTemplateFromRedux(previewDocument)
        return
      }
      */

      // Priority 2: Check if we have a templateId from URL
      if (templateId) {
        await loadTemplateFromUrl(parseInt(templateId))
        return
      }

      // Priority 3: Show template selector
      await loadTemplates()
    } catch (err) {
      console.error('Error initializing document generator:', err)
      showToastifyError('Error al inicializar el generador de documentos')
    } finally {
      setInitializationComplete(true)
    }
  }

  const loadTemplateFromRedux = async (templateIdFromRedux: number) => {
    setLoadingTemplate(true)
    try {
      const response = await getTemplate(templateIdFromRedux)
      if (response?.data?.data) {
        setSelectedTemplate(response.data.data)
        setSelectedTemplateId(templateIdFromRedux)
        setPreviewData({})
        setDocumentName('')
      }
    } catch (err) {
      console.error('Error loading template from Redux:', err)
      showToastifyError('Error al cargar la plantilla desde Redux')
    } finally {
      setLoadingTemplate(false)
    }
  }

  const loadTemplateFromUrl = async (templateIdFromUrl: number) => {
    setLoadingTemplate(true)
    try {
      const response = await getTemplate(templateIdFromUrl)
      if (response?.data?.data) {
        setSelectedTemplate(response.data.data)
        setSelectedTemplateId(templateIdFromUrl)
        setPreviewData({})
        setDocumentName('')
      }
    } catch (err) {
      console.error('Error loading template from URL:', err)
      showToastifyError('Error al cargar la plantilla desde la URL')
    } finally {
      setLoadingTemplate(false)
    }
  }

  const loadTemplates = async () => {
    try {
      const response = await getTemplates()
      if (response?.data?.data) {
        setTemplates(
          Array.isArray(response.data.data) ? response.data.data : []
        )
      }
    } catch (err) {
      console.error('Error loading templates:', err)
      showToastifyError('Error al cargar las plantillas')
    }
  }

  const handleTemplateSelect = async (templateId: number) => {
    if (!templateId) {
      setSelectedTemplate(null)
      setPreviewData({})
      return
    }

    setLoadingTemplate(true)
    try {
      const response = await getTemplate(templateId)
      if (response?.data?.data) {
        setSelectedTemplate(response.data.data)
        setPreviewData({})
        setDocumentName('')
      }
    } catch (err) {
      showToastifyError('Error al cargar la plantilla seleccionada')
    } finally {
      setLoadingTemplate(false)
    }
  }

  const handleGenerateDocument = async () => {
    if (!selectedTemplate || !documentName.trim()) {
      showToastifyError('Por favor complete todos los campos requeridos')
      return
    }

    // Validate that all required fields have values
    const requiredFields = selectedTemplate.campos_asociados || []
    const missingFields = requiredFields.filter(
      (field) => !previewData[field.nombre_variable]?.trim()
    )

    if (missingFields.length > 0) {
      showToastifyError(
        `Por favor complete los siguientes campos: ${missingFields
          .map((field) => field.campo_nombre)
          .join(', ')}`
      )
      return
    }

    setLoadingGenerate(true)
    try {
      // Add document name to the data
      /*
      const documentData = {
        ...previewData,
        nombre_documento: documentName,
      }
      */

      const response = await generateDocument(selectedTemplate.id, {
        tipo: {
          nombre: 'Escrito',
        },
        nombre: documentName,
        descripcion: 'Desde FrontEnd',
        html_con_campos: selectedTemplate.html_con_campos,
        usuario: 2,
      })
      if (response?.data?.data) {
        showToastifySuccess('Documento generado exitosamente')
        // TODO: Handle the generated document (download, preview, etc.)
        console.log('Generated document:', response.data.data)

        // Reset form after successful generation
        handleResetDocument()
        return response.data.data
      }
    } catch (err) {
      console.error('Error generating document:', err)
      showToastifyError('Error al generar el documento')
    } finally {
      setLoadingGenerate(false)
    }
  }

  const handleResetDocument = () => {
    setDocumentName('')
    setPreviewData({})
  }

  // Convert TemplateField[] to AssignedField[] for DocumentPreview component
  const getAssignedFields = (): AssignedField[] => {
    if (!selectedTemplate?.campos_asociados) return []

    return selectedTemplate.campos_asociados.map((field: TemplateField) => ({
      fieldId: field.campo,
      variableName: field.nombre_variable,
      selectedText: field.campo_nombre, // Using campo_nombre as display text
    }))
  }

  return {
    // Templates state
    templates,
    templateId,
    selectedTemplateId,
    setSelectedTemplateId,
    selectedTemplate,
    initializationComplete,

    // Loading states
    isLoading,
    error,
    loadingTemplate,
    loadingGenerate,

    // Document state
    documentName,
    setDocumentName,
    previewData,
    setPreviewData,

    // Actions
    handleTemplateSelect,
    handleGenerateDocument,
    handleResetDocument,
    loadTemplates,
    getAssignedFields,
  }
}
