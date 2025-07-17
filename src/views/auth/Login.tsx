import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  showToastifySuccess,
  showToastifyError,
} from '../../utils/showToastify'
import { DialogModal } from '../../components'
import { ContainerApp, BoxContainerApp } from '../../layouts'
import { StyledContainer, StyledCard } from '../../assets/styles/style'
import { LoginFormInterface } from '../../model_interfaces'
import { resetValues } from '../../data/loginForm'
import { useNavigate } from 'react-router'

const Login: React.FC = () => {
  const [emailToPasswordRecover, setEmailToPasswordRecover] = useState('')
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<LoginFormInterface>(resetValues)
  const navigate = useNavigate()

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setEmailToPasswordRecover('')
  }

  const handleChange =
    (prop: keyof LoginFormInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <StyledContainer fixed>
      <StyledCard>
        <ContainerApp>
          <BoxContainerApp>
            <Typography component='h1' variant='h5'>
              Iniciar Sesión
            </Typography>
            <Box
              autoComplete='off'
              component='form'
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                autoFocus
                fullWidth
                id='email'
                label='Correo Electrónico'
                margin='normal'
                name='email'
                onChange={handleChange('email')}
                placeholder='correo@ejemplo.com'
                required
              />
              <TextField
                fullWidth
                id='password'
                label='Contraseña'
                margin='normal'
                name='password'
                onChange={handleChange('password')}
                required
                type={'password'}
                value={values.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    color='primary'
                    onChange={() => {}}
                  />
                }
                label='Recuérdame'
              />
              <Button
                color='primary'
                disabled={false}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Link
                  onClick={() => setOpen(true)}
                  sx={{ margin: 'auto' }}
                  variant='body2'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Box>
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
                onSubmit={() => {}}
                sx={{ mt: 1, pb: 0 }}
              >
                <TextField
                  autoFocus
                  fullWidth
                  id='emailTPR'
                  label='Correo Electrónico'
                  margin='normal'
                  name='emailTPR'
                  onChange={(e) => setEmailToPasswordRecover(e.target.value)}
                  placeholder='correo@ejemplo.com'
                  required
                />
                <Button
                  color='primary'
                  disabled={false}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Recuperar Contraseña
                </Button>
              </Box>
            }
            dialogModalContentText='Ingresa el correo electrónico de la cuenta. Luego de solicitar una nueva contraseña, revisa tu correo electrónico.'
            dialogModalTitle='Recupera tu contraseña'
            handleClose={handleCloseModal}
            open={open}
          />
        </ContainerApp>
      </StyledCard>
    </StyledContainer>
  )
}

export default Login
