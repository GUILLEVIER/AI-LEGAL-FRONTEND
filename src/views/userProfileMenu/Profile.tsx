import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Link,
} from '@mui/material'
import { BoxContainerApp, ContainerApp } from '../../layouts'
import { sessionResult } from '../../redux/selectors'
import { useSelector } from 'react-redux'
import { SessionState } from '../../legal'
import { DialogModal } from '../../components'
import { useApiWithAuth } from '../../hooks/useApiWithAuth'
import {
  showToastifyError,
  showToastifySuccess,
} from '../../utils/showToastify'

const Profile: React.FC = () => {
  // HOOKS
  const {
    isLoading,
    error,
    getWithAuth,
    postWithAuth,
    putWithAuth,
    deleteWithAuth,
  } = useApiWithAuth()

  // USE STATE
  const [open, setOpen] = useState(false)
  /*
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  */
  const [passwordChange, setPasswordChange] = useState<any>({
    new_password1: '',
    new_password2: '',
  })

  // REDUX
  const user: any = useSelector((state: SessionState) => sessionResult(state))

  // METHODS
  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    /*
    setPasswordChange({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    */
    setPasswordChange({
      new_password1: '',
      new_password2: '',
    })
  }

  const handleChangePasswordChange =
    (prop: keyof any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordChange({ ...passwordChange, [prop]: event.target.value })
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    changePassword()
  }

  const changePassword = async () => {
    if (passwordChange.new_password1 === passwordChange.new_password2) {
      const response = await postWithAuth('/password/change', {
        new_password1: passwordChange.new_password1,
        new_password2: passwordChange.new_password2,
      })
      if (response && response.data) {
        setOpen(false)
        /*
        setPasswordChange({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        */
        setPasswordChange({
          new_password1: '',
          new_password2: '',
        })
        showToastifySuccess(response.data.message)
      } else {
        if (error) {
          showToastifyError(error.details?.errors[0])
        }
      }
    } else {
      showToastifyError('Las contraseñas no coinciden.')
    }
  }

  return (
    <div>
      <h1>Perfil</h1>
      <ContainerApp>
        <BoxContainerApp>
          <Typography
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 2 }}
            variant='subtitle1'
          >
            Datos del Perfil
          </Typography>
          <TextField
            disabled={true}
            fullWidth
            id='name'
            label='Nombre'
            margin='normal'
            name='name'
            onChange={() => {}}
            required
            value={user.first_name.toString().toUpperCase()}
          />
          <TextField
            disabled={true}
            fullWidth
            id='lastName'
            label='Apellido'
            margin='normal'
            name='lastName'
            onChange={() => {}}
            required
            value={user.last_name.toString().toUpperCase()}
          />
          <TextField
            disabled={true}
            fullWidth
            id='email'
            label='Correo Electrónico'
            margin='normal'
            name='email'
            onChange={() => {}}
            placeholder='correo@ejemplo.com'
            required
            value={user.email}
          />
          <Typography
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 2 }}
            variant='subtitle1'
          >
            Acciones
          </Typography>
          <Grid container>
            <Link
              onClick={() => setOpen(true)}
              sx={{ margin: 'auto' }}
              variant='body2'
            >
              ¿Cambiar Contraseña?
            </Link>
          </Grid>
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
              <TextField
                fullWidth
                margin='normal'
                name='currentPassword'
                label='Contraseña Actual'
                value={passwordChange.currentPassword}
                onChange={handleChangePasswordChange('currentPassword')}
              />
              <TextField
                fullWidth
                margin='normal'
                //name='newPassword'
                name='new_password1'
                label='Nueva Contraseña'
                //value={passwordChange.newPassword}
                //onChange={handleChangePasswordChange('newPassword')}
                value={passwordChange.new_password1}
                onChange={handleChangePasswordChange('new_password1')}
              />
              <TextField
                fullWidth
                margin='normal'
                name='new_password2'
                //name='confirmPassword'
                label='Confirmar Nueva Contraseña'
                //value={passwordChange.confirmPassword}
                //onChange={handleChangePasswordChange('confirmPassword')}
                value={passwordChange.new_password2}
                onChange={handleChangePasswordChange('new_password2')}
              />
              <Button
                color='primary'
                disabled={isLoading}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Cambiar Contraseña
              </Button>
            </Box>
          }
          dialogModalContentText='Ingresa tu nueva contraseña y confírmala.'
          dialogModalTitle='Cambia tu contraseña'
          handleClose={handleCloseModal}
          open={open}
        />
      </ContainerApp>
    </div>
  )
}

export default Profile
