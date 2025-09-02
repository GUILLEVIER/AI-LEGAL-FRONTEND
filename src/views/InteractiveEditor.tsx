import React from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { BoxContainerApp, ContainerApp } from '../layouts'
import DialogModal from '../components/DialogModal'
import DocumentEditor from '../components/interactiveEditor/DocumentEditor'
import DocumentPreview from '../components/interactiveEditor/DocumentPreview'
import HelpGuide from '../components/interactiveEditor/HelpGuide'
import InformationSection from '../components/InformationSection'
import { useInteractiveEditor } from '../hooks/views/useInteractiveEditor'
import FieldsManager from '../components/interactiveEditor/FieldsManager'

/**
 * Interactive Editor View Component
 * Main component that provides an interactive document editing experience
 * with field management and template creation capabilities
 */
const InteractiveEditor: React.FC = () => {
  // Hook for managing editor state and logic
  const {
    // Template state
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    htmlContent,
    setHtmlContent,
    templateType,
    setTemplateType,
    templateTypes,

    // Fields state
    availableFields,
    assignedFields,
    unassignedFields,

    // Modal state
    isFieldModalOpen,
    setIsFieldModalOpen,
    isAssignModalOpen,
    setIsAssignModalOpen,
    selectedText,
    setSelectedText,

    // Form state
    newFieldName,
    setNewFieldName,
    newFieldType,
    setNewFieldType,
    selectedFieldId,
    setSelectedFieldId,
    variableName,
    setVariableName,

    // Loading state
    loading,

    // Preview data
    previewData,
    setPreviewData,

    // Actions
    handleCreateField,
    handleAssignField,
    handleRemoveAssignedField,
    handleSaveTemplate,
    handleTextSelection,
    handleCloseAssignModal,
    handleConfirmAssignment,
    handleCloseFieldModal,
    handleConfirmFieldCreation,
    resetForm,
  } = useInteractiveEditor()
  return (
    <>
      <Typography component='h1' variant='h4' sx={{ my: 3 }}>
        Editor Interactivo
      </Typography>

      <ContainerApp maxWidth='xl'>
        <BoxContainerApp>
          {/* Help Guide */}
          {/* <HelpGuide /> */}
          {/* Main Editor Layout */}
          <Grid container spacing={3}>
            {/* Left Column - Document Editor */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Editor de Documentos
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 2 }}
                >
                  Escribe el contenido de tu documento y selecciona texto para
                  asignar campos
                </Typography>
                <DocumentEditor
                  key={htmlContent ? 'with-content' : 'empty'}
                  content={htmlContent}
                  placeholder='Escribe tu documento aquí...'
                  onUpdate={setHtmlContent}
                  onTextSelection={handleTextSelection}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                  {selectedText && (
                    <Alert
                      severity='info'
                      sx={{ flexGrow: 1, alignItems: 'center' }}
                    >
                      Seleccionado: "
                      {selectedText.length > 50
                        ? selectedText.substring(0, 50) + '...'
                        : selectedText}
                      "
                    </Alert>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Far Right Column - Document Preview */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Typography variant='h6' sx={{ mb: 1 }}>
                Previsualización del Documento
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Previsualiza cómo se verá tu documento con datos de ejemplo
              </Typography>
              <DocumentPreview
                htmlContent={htmlContent}
                assignedFields={assignedFields}
                previewData={previewData}
                onPreviewDataChange={setPreviewData}
              />
            </Grid>

            {/* Right Column - Fields Management */}
            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' sx={{ mb: 1 }}>
                Gestión de Campos
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Gestiona los campos disponibles y sus asignaciones
              </Typography>
              <FieldsManager
                availableFields={availableFields}
                assignedFields={assignedFields}
                unassignedFields={unassignedFields}
                onCreateField={() => setIsFieldModalOpen(true)}
                onRemoveAssignedField={handleRemoveAssignedField}
                isLoading={loading}
              />
            </Grid>
          </Grid>
          {/* Template Information Section */}
          <InformationSection
            type='template'
            templateName={templateName}
            setTemplateName={setTemplateName}
            templateDescription={templateDescription}
            setTemplateDescription={setTemplateDescription}
            templateType={templateType}
            setTemplateType={setTemplateType}
            templateTypes={templateTypes.map((type) => ({
              id: type.id,
              nombre: type.name,
            }))}
            onSaveTemplate={handleSaveTemplate}
            onResetTemplate={resetForm}
            loading={loading}
            disabled={!htmlContent.trim()}
          />
          <DialogModal
            open={isFieldModalOpen}
            handleClose={handleCloseFieldModal}
            dialogModalTitle='Crear Nuevo Campo'
            dialogModalContentText='Crea un nuevo campo que podrá ser usado en tus plantillas'
            dialogModalContent={
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
              >
                <TextField
                  fullWidth
                  label='Nombre del Campo'
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  variant='outlined'
                  placeholder='Ingrese el nombre del campo'
                  required
                />
                <FormControl fullWidth>
                  <InputLabel>Tipo de Campo</InputLabel>
                  <Select
                    value={newFieldType}
                    onChange={(e) =>
                      setNewFieldType(
                        e.target.value as 'texto' | 'fecha' | 'numero'
                      )
                    }
                    label='Tipo de Campo'
                  >
                    <MenuItem value='texto'>Texto</MenuItem>
                    <MenuItem value='fecha'>Fecha</MenuItem>
                    <MenuItem value='numero'>Número</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant='contained'
                  onClick={handleConfirmFieldCreation}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Crear'}
                </Button>
              </Box>
            }
            dialogModalActions={
              <Box>
                <Button
                  color='warning'
                  size='large'
                  variant='contained'
                  onClick={handleCloseFieldModal}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Box>
            }
          />
          <DialogModal
            open={isAssignModalOpen}
            handleClose={handleCloseAssignModal}
            dialogModalTitle='Asignar Campo al Texto Seleccionado'
            dialogModalContentText={`Asigna un campo al texto seleccionado: "${selectedText}"`}
            dialogModalContent={
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
              >
                {selectedText && (
                  <Alert severity='info' sx={{ mb: 1 }}>
                    Texto seleccionado: "{selectedText}"
                  </Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel>Seleccionar Campo</InputLabel>
                  <Select
                    value={selectedFieldId || ''}
                    onChange={(e) => setSelectedFieldId(Number(e.target.value))}
                    label='Seleccionar Campo'
                  >
                    <MenuItem value=''>Elige un campo</MenuItem>
                    {unassignedFields.map((field) => (
                      <MenuItem key={field.id} value={field.id}>
                        {field.name} ({field.dataType})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label='Nombre de Variable'
                  value={variableName}
                  onChange={(e) => setVariableName(e.target.value)}
                  variant='outlined'
                  placeholder='ej. nombre_cliente'
                  helperText={`Se usará como {{${variableName}}} en la plantilla`}
                  required
                />
                <Button
                  variant='contained'
                  onClick={handleConfirmAssignment}
                  //disabled={loading || !selectedFieldId || !variableName.trim()}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Asignar'}
                </Button>
              </Box>
            }
            dialogModalActions={
              <Box>
                <Button
                  color='warning'
                  size='large'
                  variant='contained'
                  onClick={handleCloseAssignModal}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Box>
            }
          />
        </BoxContainerApp>
      </ContainerApp>
    </>
  )
}

export default InteractiveEditor
