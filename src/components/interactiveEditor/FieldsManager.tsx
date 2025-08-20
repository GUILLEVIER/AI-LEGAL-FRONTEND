import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { AssignedField } from '../../interfaces/interactiveEditorInterface'
import { useFieldsManager } from '../../hooks/components/interactiveEditor/useFieldsManager'
import { AvailableFieldMapper } from '../../interfaces/mappersInterface'

interface FieldsManagerProps {
  availableFields: AvailableFieldMapper[]
  assignedFields: AssignedField[]
  unassignedFields: AvailableFieldMapper[]
  onCreateField: () => void
  onRemoveAssignedField: (index: number) => void
  isLoading?: boolean
}

/**
 * Component for managing available and assigned fields
 * Displays lists of fields and provides actions for field management
 */
const FieldsManager: React.FC<FieldsManagerProps> = ({
  availableFields,
  assignedFields,
  unassignedFields,
  onCreateField,
  onRemoveAssignedField,
  isLoading = false,
}) => {
  const {
    hasAvailableFields,
    hasUnassignedFields,
    hasAssignedFields,
    availableFieldsCount,
    unassignedFieldsCount,
    assignedFieldsCount,
    getFieldNameById,
    getFieldTypeById,
    getTypeColor,
    handleCreateField,
    handleRemoveAssignedField,
    isAssignDisabled,
    getUnassignedEmptyMessage,
  } = useFieldsManager({
    availableFields,
    assignedFields,
    unassignedFields,
    onCreateField,
    onRemoveAssignedField,
    isLoading,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      {/* Available Fields Section */}
      <Card sx={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h6' component='h3'>
              Campos disponibles ({availableFieldsCount})
            </Typography>
          </Box>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleCreateField}
            disabled={isLoading}
            size='small'
          >
            Crear campo
          </Button>

          {!hasAvailableFields ? (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center', py: 2 }}
            >
              No hay campos disponibles. Crea tu primer campo para comenzar.
            </Typography>
          ) : (
            <List dense>
              {availableFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <ListItem>
                    <ListItemText
                      primary={field.name}
                      secondary={
                        <Chip
                          label={field.dataType}
                          size='small'
                          color={getTypeColor(field.dataType)}
                          variant='outlined'
                        />
                      }
                    />
                  </ListItem>
                  {index < availableFields.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Unassigned Fields Section */}
      <Card sx={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h6' component='h3'>
              Campos no asignados ({unassignedFields.length})
            </Typography>
          </Box>

          {unassignedFields.length === 0 ? (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center', py: 2 }}
            >
              {availableFields.length === 0
                ? 'No hay campos disponibles para asignar.'
                : 'Todos los campos disponibles han sido asignados.'}
            </Typography>
          ) : (
            <List dense>
              {unassignedFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <ListItem>
                    <ListItemText
                      primary={field.name}
                      secondary={
                        <Chip
                          label={field.dataType}
                          size='small'
                          color={getTypeColor(field.dataType)}
                          variant='outlined'
                        />
                      }
                    />
                  </ListItem>
                  {index < unassignedFields.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Assigned Fields Section */}
      <Card sx={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
        <CardContent>
          <Typography variant='h6' component='h3' sx={{ mb: 2 }}>
            Campos asignados ({assignedFields.length})
          </Typography>

          {assignedFields.length === 0 ? (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center', py: 2 }}
            >
              No hay campos asignados todavía. Selecciona texto en el editor y
              asigna un campo para crear variables.
            </Typography>
          ) : (
            <List dense>
              {assignedFields.map((assignedField: AssignedField, index) => (
                <React.Fragment key={`${assignedField.fieldId}-${index}`}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography variant='body2' fontWeight='bold'>
                            {`{{${assignedField.variableName}}}`}
                          </Typography>
                          <Chip
                            label={getFieldTypeById(assignedField.fieldId)}
                            size='small'
                            color={getTypeColor(
                              getFieldTypeById(assignedField.fieldId)
                            )}
                            variant='outlined'
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant='caption' color='text.secondary'>
                            Campo: {getFieldNameById(assignedField.fieldId)}
                          </Typography>
                          <br />
                          <Typography variant='caption' color='text.secondary'>
                            Texto original: "{assignedField.selectedText}"
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='remove'
                        onClick={() => onRemoveAssignedField(index)}
                        disabled={isLoading}
                        size='small'
                        color='error'
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < assignedFields.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default FieldsManager
