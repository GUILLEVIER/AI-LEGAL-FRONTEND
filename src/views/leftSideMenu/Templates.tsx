import React from 'react'
import { useTemplate } from '../../hooks/views/leftSideMenu/useTemplate'
import { Box, Button, Typography } from '@mui/material'
import { BoxContainerApp, ContainerApp } from '../../layouts'
import {
  TemplateList,
  UploadDocument,
  UploadedDocumentsList,
} from '../../components'

const Templates: React.FC = () => {
  const { selectedButton, setSelectedButton } = useTemplate()
  return (
    <>
      <Typography component='h1' variant='h5' sx={{ my: 2 }}>
        Gestión de Plantillas
      </Typography>
      <ContainerApp maxWidth='xl'>
        <BoxContainerApp>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setSelectedButton({
                  uploadedDocuments: false,
                  generatedDocuments: false,
                  createTemplate: false,
                  existingTemplates: true,
                })
              }}
            >
              Plantillas Existentes
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setSelectedButton({
                  existingTemplates: false,
                  uploadedDocuments: false,
                  generatedDocuments: false,
                  createTemplate: true,
                })
              }}
            >
              Crear Plantilla
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setSelectedButton({
                  existingTemplates: false,
                  generatedDocuments: false,
                  createTemplate: false,
                  uploadedDocuments: true,
                })
              }}
            >
              Documentos Subidos
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setSelectedButton({
                  existingTemplates: false,
                  uploadedDocuments: false,
                  createTemplate: false,
                  generatedDocuments: true,
                })
              }}
            >
              Documentos Generados
            </Button>
          </Box>
          {selectedButton.createTemplate && <UploadDocument />}
          {selectedButton.existingTemplates && <TemplateList />}
          {selectedButton.uploadedDocuments && <UploadedDocumentsList />}
          {/* {selectedButton.generatedDocuments && <GeneratedDocuments />} */}
        </BoxContainerApp>
      </ContainerApp>
    </>
  )
}

export default Templates
