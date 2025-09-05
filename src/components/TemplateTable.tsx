import { TemplateTableProps } from '@/interfaces/propsInterface'
import TableInfo from './TableInfo'
import {
  DeleteTwoTone,
  VisibilityTwoTone,
  EditTwoTone,
  PlayArrowTwoTone,
  ShareTwoTone,
} from '@mui/icons-material'
import { Template } from '@/interfaces/apiResponsesInterface'

const TemplateTable: React.FC<TemplateTableProps> = ({
  data,
  navigate,
  handleEditTemplate,
  handleDeleteTemplate,
  handlePreviewTemplate,
  handleToggleFavorite,
}) => {
  console.log('INFORMACIÓN DESDE TEMPLATETABLE: ', data)
  return (
    <TableInfo
      data={data}
      headData={[
        { title: '' },
        { title: 'Nombre' },
        { title: 'Tipo' },
        { title: 'Categoría' },
        { title: 'Clasificación' },
        { title: 'Descripción' },
        { title: 'Acciones' },
      ]}
      resourceType='template'
      handleToggleFavorite={handleToggleFavorite}
      actionButtons={[
        {
          icon: <DeleteTwoTone />,
          tooltip: 'Eliminar',
          onClick: (template: Template) => {
            handleDeleteTemplate(template.id)
          },
          color: 'error',
          variant: 'outlined',
          size: 'large',
        },
        {
          icon: <VisibilityTwoTone />,
          tooltip: 'Previsualizar',
          onClick: (template: Template) => {
            handlePreviewTemplate(template)
          },
          color: 'primary',
          variant: 'outlined',
          size: 'large',
        },
        {
          icon: <EditTwoTone />,
          tooltip: 'Editar',
          onClick: (template: Template) => {
            handleEditTemplate(template)
          },
          color: 'secondary',
          variant: 'outlined',
          size: 'large',
        },
        {
          icon: <PlayArrowTwoTone />,
          tooltip: 'Utilizar',
          onClick: (template: Template) => {
            navigate(`/control-panel/document-generator/${template.id}`)
          },
          color: 'success',
          variant: 'outlined',
          size: 'large',
        },
        {
          icon: <ShareTwoTone />,
          tooltip: 'Compartir',
          onClick: (template: Template) => {
            // TODO: Implementar función de compartir
            console.log('Compartir plantilla:', template)
          },
          color: 'info',
          variant: 'outlined',
          size: 'large',
        },
      ]}
    />
  )
}

export default TemplateTable
