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
import { resetValues } from '../../data/loginForm'
import { useNavigate } from 'react-router'
import {
  sessionErrors,
  sessionResult,
  sessionStatus,
} from '../../redux/selectors'
import { logIn } from '../../redux/actions'
import { LoginFormInterface } from '../../model_interfaces/formsInterface'
import { SessionState } from '../../legal'
import { AuthInfo } from '../../model_interfaces/configInterface'
import { useTokenValidator } from '../../hooks/useTokenValidator'

const Login: React.FC = () => {
  // USE STATES AND HOOKS
  const [emailToPasswordRecover, setEmailToPasswordRecover] = useState('')
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<LoginFormInterface>(resetValues)
  const { getAuthStatus } = useTokenValidator()
  const navigate = useNavigate()

  // REDUX
  const dispatch = useDispatch()
  const errors: string[] = useSelector((state: SessionState) =>
    sessionErrors(state)
  )
  const result: any = useSelector((state: SessionState) => sessionResult(state))
  const status: string = useSelector((state: SessionState) =>
    sessionStatus(state)
  )

  // USE EFFECT
  useEffect(() => {
    if (status === 'FETCHED') {
      if (result.first_name && result.last_name) {
        showToastifySuccess(
          `Bienvenido ${result.first_name.toUpperCase()} ${result.last_name.toUpperCase()}`
        )
      } else {
        showToastifySuccess(`Bienvenido ${result.username.toUpperCase()}`)
      }
      navigate('/dashboard')
    }
    if (status === 'ERROR') {
      showToastifyError(errors[0])
    }
  }, [status, result, errors])

  useEffect(() => {
    const authStatus = getAuthStatus()
    if (authStatus?.isAuthenticated) {
      navigate('/dashboard')
    }
  }, [])

  // METHODS
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
      email: emailToPasswordRecover,
    }
    //dispatch(sendToken(data))
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setEmailToPasswordRecover('')
  }

  const prepareDataAndGenerateRequest = () => {
    let data = {
      email: values.email,
      password: values.password,
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
                    checked={values.remember}
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
