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
import React, { use, useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  showToastifySuccess,
  showToastifyError,
} from '../../utils/showToastify'
import { DialogModal } from '../../components'
import { ContainerApp, BoxContainerApp } from '../../layouts'
import { StyledContainer, StyledCard } from '../../assets/styles/style'
import { resetValues } from '../../data/loginForm'
import { useNavigate } from 'react-router'
import {
  sessionErrors,
  sessionResult,
  sessionStatus,
} from '../../redux/selectors'
import { logIn } from '../../redux/actions'
import { LoginFormInterface } from '../../model_interfaces/formsInterface'
import { LoginResponse } from '../../model_interfaces/apiResponsesInterface'
import { SessionState } from '../../legal'

const Login: React.FC = () => {
  const [emailToPasswordRecover, setEmailToPasswordRecover] = useState('')
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<LoginFormInterface>(resetValues)
  const navigate = useNavigate()

  const handleChange =
    (prop: keyof LoginFormInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    prepareDataAndGenerateRequest()
  }

  const handleSubmitPasswordRecover = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    let data = {
      user: {
        email: emailToPasswordRecover,
      },
    }
    //dispatch(sendToken(data))
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setEmailToPasswordRecover('')
  }

  // ** Connection **
  const dispatch = useDispatch()
  const errors:  = useSelector((state: SessionState) => sessionErrors(state))
  const result: LoginResponse = useSelector((state: SessionState) => sessionResult(state))
  const status: string = useSelector((state: SessionState) => sessionStatus(state))

  useEffect(() => {
    if (status === 'FETCHED') {
      showToastifySuccess(
        `Bienvenido ${result.user.first_name} ${result.user.last_name}`
      )
      navigate('/dashboard')
    }
    if (status === 'ERROR') {
      showToastifyError()
    }
  }, [status, result, errors, history])

  const prepareDataAndGenerateRequest = () => {
    let data = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    }
    let extra = {
      remember: values.remember,
    }
    dispatch(logIn({ data, extra }))
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
                id='username'
                label='Nombre de Usuario'
                margin='normal'
                name='username'
                onChange={handleChange('username')}
                placeholder='Guillermo'
                required
              />
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    color='primary'
                    onChange={() =>
                      setValues({
                        ...values,
                        remember: !values.remember,
                      })
                    }
                  />
                }
                label='Recuérdame'
              />
              <Button
                color='primary'
                disabled={status === 'FETCHING'}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                {status === 'FETCHING' ? (
                  <CircularProgress
                    sx={{ color: '#FFFFFF' }}
                    thickness={4}
                    value={100}
                  />
                ) : (
                  'Iniciar sesión'
                )}
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
