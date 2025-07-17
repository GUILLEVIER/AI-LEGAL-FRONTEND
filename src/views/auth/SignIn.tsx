import { Box, Button, TextField, Typography, Grid } from '@mui/material'
import React, { useState } from 'react'
import { ContainerApp, BoxContainerApp } from '../../layouts'
import { StyledContainer, StyledCard } from '../../assets/styles/style'

const SignIn: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    alert('Registro exitoso')
  }

  return (
    <StyledContainer fixed>
      <StyledCard>
        <ContainerApp>
          <BoxContainerApp>
            <Typography component='h1' variant='h5'>
              Crea tu cuenta
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
                onChange={handleChange}
                placeholder='correo@ejemplo.com'
                required
                value={form.email}
              />
              <TextField
                fullWidth
                id='password'
                label='Contraseña'
                margin='normal'
                name='password'
                onChange={handleChange}
                required
                type='password'
                value={form.password}
              />
              <TextField
                fullWidth
                id='confirmPassword'
                label='Confirmar Contraseña'
                margin='normal'
                name='confirmPassword'
                onChange={handleChange}
                required
                type='password'
                value={form.confirmPassword}
              />
              {error && (
                <Typography
                  color='error'
                  variant='body2'
                  align='center'
                  sx={{ mt: 1 }}
                >
                  {error}
                </Typography>
              )}
              <Button
                color='primary'
                disabled={false}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mt: 2 }}
              >
                Registrarse
              </Button>
            </Box>
          </BoxContainerApp>
        </ContainerApp>
      </StyledCard>
    </StyledContainer>
  )
}

export default SignIn
