import React, { useState } from 'react'

export const useSignIn = () => {
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

  return {
    form,
    error,
    handleChange,
    handleSubmit,
  }
}
