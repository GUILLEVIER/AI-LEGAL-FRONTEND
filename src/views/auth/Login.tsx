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
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { DialogModal } from '../../components'
import { ContainerApp, BoxContainerApp } from '../../layouts'
import { StyledContainer, StyledCard } from '../../assets/styles/style'
import { useLogin } from '../../hooks/views/auth/useLogin'
import { paletteColors } from '../../utils/paletteColors'

const Login: React.FC = () => {
  const {
    handleChange,
    handleClickShowPassword,
    handleCloseModal,
    handleMouseDownPassword,
    handleSubmit,
    open,
    setEmailToPasswordRecover,
    setOpen,
    setValues,
    status,
    values,
  } = useLogin()

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
                    sx={{ color: paletteColors.colorPrimary }}
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
