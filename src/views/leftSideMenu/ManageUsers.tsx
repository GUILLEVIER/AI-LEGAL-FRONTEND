import React, { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { BoxContainerApp, ContainerApp } from '../../layouts'
import {
  User,
  UserProfileResponse,
} from '../../interfaces/apiResponsesInterface'
import { useManageUsers } from '../../hooks/views/leftSideMenu/useManageUsers'
import {
  DialogModal,
  DialogModalConfirmDelete,
  TableInfo,
} from '../../components'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import { GroupTypesInterface } from '../../interfaces/dataInterface'

const ManageUsers: React.FC = () => {
  const {
    open,
    handleSubmit,
    handleCloseModal,
    users,
    filteredUsers,
    setFilteredUsers,
    setOpen,
    isLoading,
    handleClickDeleteFilter,
    handleChangeFilter,
    filter,
    handleChange,
    values,
    isViewMode,
    isEditMode,
    handleViewUserDetails,
    handleEditUser,
    handleCloseModalDeleteUser,
    openDeleteModalUser,
    handleConfirmDeleteUser,
    handleDeleteUser,
  } = useManageUsers()

  console.log('Filtered Users:', filteredUsers)
  console.log('Users:', users)

  return (
    <>
      <Typography component='h1' variant='h5'>
        Gestión de Usuarios
      </Typography>
      <ContainerApp maxWidth='lg'>
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
              onClick={() => setOpen(true)}
            >
              Crear Usuario
            </Button>
          </Box>
          <Typography
            gutterBottom
            sx={{ fontWeight: 'bold', my: 2 }}
            variant='subtitle1'
          >
            Buscador de Usuarios
          </Typography>
          <TextField
            label='Buscar usuario'
            variant='outlined'
            fullWidth
            onChange={handleChangeFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    edge='end'
                    onClick={handleClickDeleteFilter}
                  >
                    {filteredUsers.length ? (
                      <PersonSearchTwoToneIcon />
                    ) : (
                      <CloseTwoToneIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={filter}
          />
          <Typography
            gutterBottom
            sx={{ fontWeight: 'bold', my: 2 }}
            variant='subtitle1'
          >
            Lista de Usuarios
          </Typography>
          <TableInfo
            data={filteredUsers}
            headData={[
              { title: 'Nombre' },
              { title: 'Email' },
              { title: 'Acciones' },
            ]}
            resourceType='user'
            actionButtons={[
              {
                icon: <VisibilityTwoToneIcon />,
                tooltip: 'Detalles',
                onClick: (user: User) => {
                  handleViewUserDetails(user)
                },
                color: 'primary',
                variant: 'outlined',
                size: 'large',
              },
              {
                icon: <EditTwoToneIcon />,
                tooltip: 'Editar',
                onClick: (user: User) => {
                  handleEditUser(user)
                },
                color: 'secondary',
                variant: 'outlined',
                size: 'large',
              },
              {
                icon: <DeleteTwoToneIcon />,
                tooltip: 'Eliminar',
                onClick: (user: User) => {
                  handleDeleteUser(user)
                },
                color: 'error',
                variant: 'outlined',
                size: 'large',
              },
            ]}
          />
        </BoxContainerApp>
        <DialogModal
          dialogModalActions={
            <Box>
              <Button
                color='warning'
                onClick={handleCloseModal}
                size='large'
                variant='contained'
              >
                Cancelar
              </Button>
            </Box>
          }
          dialogModalContent={
            <Box
              autoComplete='off'
              component='form'
              onSubmit={handleSubmit}
              sx={{ mt: 1, pb: 0 }}
            >
              <Typography
                gutterBottom
                sx={{ fontWeight: 'bold', mt: 2 }}
                variant='subtitle1'
              >
                Datos Básicos
              </Typography>
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='userName'
                label='Nombre de Usuario'
                margin='normal'
                name='userName'
                onChange={handleChange('userName')}
                required
                value={values.userName}
              />
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='firstName'
                label='Apellido Paterno'
                margin='normal'
                name='firstName'
                onChange={handleChange('firstName')}
                required
                value={values.firstName}
              />
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='lastName'
                label='Apellido Materno'
                margin='normal'
                name='lastName'
                onChange={handleChange('lastName')}
                required
                value={values.lastName}
              />
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='email'
                label='Correo Electrónico'
                margin='normal'
                name='email'
                onChange={handleChange('email')}
                placeholder='correo@ejemplo.com'
                required
                value={values.email}
              />
              <Typography
                gutterBottom
                sx={{ fontWeight: 'bold', mt: 2 }}
                variant='subtitle1'
              >
                Datos Específicos
              </Typography>
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='empresa'
                label='Empresa'
                margin='normal'
                name='empresa'
                onChange={handleChange('empresa')}
                required
                value={values.empresa}
              />
              <TextField
                disabled={isViewMode && !isEditMode}
                fullWidth
                id='groupType'
                label='Tipo de Usuario'
                margin='normal'
                name='groupType'
                onChange={handleChange('groupType')}
                required
                select
                value={values.groupType}
              >
                {values.groupTypes.map(
                  (groupType: GroupTypesInterface, id: number) => (
                    <MenuItem key={id} value={groupType.name}>
                      {groupType.name}
                    </MenuItem>
                  )
                )}
              </TextField>
              {!isViewMode && !isEditMode && (
                <Button
                  color='primary'
                  disabled={isLoading}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Crear Usuario
                </Button>
              )}
              {isEditMode && (
                <Button
                  color='secondary'
                  disabled={isLoading}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Guardar Cambios
                </Button>
              )}
            </Box>
          }
          dialogModalContentText={
            isEditMode
              ? 'Edita los datos del usuario.'
              : isViewMode
              ? 'Información del usuario seleccionado.'
              : 'Ingresa los datos del usuario.'
          }
          dialogModalTitle={
            isEditMode
              ? 'Editar Usuario'
              : isViewMode
              ? 'Detalles del Usuario'
              : 'Crear Usuario'
          }
          handleClose={handleCloseModal}
          open={open}
        ></DialogModal>
        <DialogModalConfirmDelete
          handleClose={handleCloseModalDeleteUser}
          handleConfirm={handleConfirmDeleteUser}
          open={openDeleteModalUser}
        />
      </ContainerApp>
    </>
  )
}

export default ManageUsers
