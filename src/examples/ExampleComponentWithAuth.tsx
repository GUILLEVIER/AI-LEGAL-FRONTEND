import React, { useState, useEffect } from 'react'
import { useApiWithAuth } from '../hooks/utils/useApiWithAuth'

/**
 * Ejemplo de componente que usa el hook useApiWithAuth
 */
interface UserData {
  id: number
  name: string
  email: string
  first_name: string
  last_name: string
  empresa: any
}

export const ExampleComponentWithAuth: React.FC = () => {
  const {
    isLoading,
    error,
    getWithAuth,
    postWithAuth,
    putWithAuth,
    deleteWithAuth,
  } = useApiWithAuth()
  const [userData, setUserData] = useState<UserData | null>(null)

  /**
   * Ejemplo 1: Cargar datos del usuario al montar el componente
   */
  useEffect(() => {
    const loadUserData = async (id: string) => {
      const response = await getWithAuth<UserData>(`/users/v1/${id}`)
      if (response && response.data.data) {
        setUserData(response.data.data)
      }
    }
    loadUserData('2') // ID de ejemplo, puede ser dinámico
  }, [getWithAuth])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplo de API con Autenticación</h1>
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error.details?.errors}
        </div>
      )}
      {/* Sección de información del usuario */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Información del Usuario</h2>
        {userData ? (
          <div>
            <p>Nombre: {userData.first_name}</p>
            <p>Email: {userData.email}</p>
            <p>Apellido: {userData.last_name}</p>
          </div>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </section>
    </div>
  )
}

export default ExampleComponentWithAuth
