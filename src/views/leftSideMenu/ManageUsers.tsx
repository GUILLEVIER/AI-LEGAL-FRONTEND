import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { BoxContainerApp, ContainerApp } from '@/layouts'
import { useManageUsers } from '@/hooks/views/leftSideMenu/useManageUsers'
import {
  DialogModal,
  DialogModalConfirmDelete,
  LoadingModal,
  TableInfo,
} from '@/components'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import {
  UsersGroupsResponseMapper,
  UserMapper,
  CompanyMapper,
} from '@/interfaces/mappersInterface'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { paletteColors } from '@/utils/paletteColors'

const ManageUsers: React.FC = () => {
  const {
    companies,
    filter,
    filteredUsers,
    groups,
    handleChange,
    handleChangeFilter,
    handleClickDeleteFilter,
    handleClickShowPassword,
    handleCloseModal,
    handleCloseModalDeleteUser,
    handleConfirmDeleteUser,
    handleDeleteUser,
    handleEditUser,
    handleMouseDownPassword,
    handleSubmit,
    handleViewUserDetails,
    isEditMode,
    isLoading,
    isViewMode,
    open,
    openDeleteModalUser,
    setOpen,
    values,
    loading,
  } = useManageUsers()

  return (
    <>
      {loading ? <LoadingModal /> : <></>}
      <Typography component='h1' variant='h5' sx={{ my: 2 }}>
        Gestión de Usuarios
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
              { title: 'Nombre Usuario' },
              { title: 'Email' },
              { title: 'Acciones' },
            ]}
            resourceType='user'
            actionButtons={[
              {
                icon: <VisibilityTwoToneIcon />,
                tooltip: 'Detalles',
                onClick: (user: UserMapper) => {
                  handleViewUserDetails(user)
                },
                color: 'primary',
                variant: 'outlined',
                size: 'large',
              },
              {
                icon: <EditTwoToneIcon />,
                tooltip: 'Editar',
                onClick: (user: UserMapper) => {
                  handleEditUser(user)
                },
                color: 'secondary',
                variant: 'outlined',
                size: 'large',
              },
              {
                icon: <DeleteTwoToneIcon />,
                tooltip: 'Eliminar',
                onClick: (user: UserMapper) => {
                  handleDeleteUser(user)
                },
                color: 'error',
                variant: 'outlined',
                size: 'large',
              },
            ]}
          />
        </BoxContainerApp>
        {open && (
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
                  label='Nombre'
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
                  label='Apellido'
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
                  id='company'
                  label='Nombre Empresa'
                  margin='normal'
                  name='company'
                  onChange={handleChange('company')}
                  required
                  select
                  value={values.company.id}
                >
                  <MenuItem key={0} value={0}>
                    SIN EMPRESA
                  </MenuItem>
                  {companies.map((company: CompanyMapper) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  disabled={isViewMode}
                  fullWidth
                  id='group'
                  label='Tipo de Usuario'
                  margin='normal'
                  name='group'
                  onChange={handleChange('group')}
                  required
                  select
                  value={values.group.id}
                >
                  <MenuItem key={0} value={0}>
                    SIN GRUPO
                  </MenuItem>
                  {groups.map((group: UsersGroupsResponseMapper) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                {!isEditMode && !isViewMode && (
                  <>
                    <TextField
                      fullWidth
                      id='password'
                      label='Contraseña'
                      margin='normal'
                      name='password'
                      onChange={handleChange('password')}
                      required
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      color='primary'
                      disabled={isLoading}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      {isLoading ? (
                        <CircularProgress
                          sx={{ color: paletteColors.colorPrimary }}
                          thickness={4}
                          value={100}
                        />
                      ) : (
                        'Crear Usuario'
                      )}
                    </Button>
                  </>
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
                    {isLoading ? (
                      <CircularProgress
                        sx={{ color: paletteColors.colorPrimary }}
                        thickness={4}
                        value={100}
                      />
                    ) : (
                      'Guardar Cambios'
                    )}
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
        )}
        <DialogModalConfirmDelete
          handleClose={handleCloseModalDeleteUser}
          handleConfirm={handleConfirmDeleteUser}
          open={openDeleteModalUser}
          disabled={isLoading}
        />
      </ContainerApp>
    </>
  )
}

export default ManageUsers
