import React, { useState, useEffect } from 'react'
import { useApiWithAuth } from '../hooks/utils/useApiWithAuth'
import { UserResponse } from '../interfaces/apiResponsesInterface'

/**
 * Ejemplo de componente que usa el hook useApiWithAuth
 */
export const ExampleComponentWithAuth: React.FC = () => {
  const { isLoading, error, getWithAuth } = useApiWithAuth()
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null)

  /**
   * Ejemplo 1: Cargar datos del usuario al montar el componente
   */
  useEffect(() => {
    const loadUserData = async (id: string) => {
      const response = await getWithAuth<UserResponse>(
        `/users/v1/usuarios/${id}`
      )
      if (response && response.data.data) {
        setUserResponse(response.data.data)
      }
    }
    loadUserData('1') // ID de ejemplo, puede ser dinámico
  }, [getWithAuth])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplo de API con Autenticación</h1>
      {isLoading && <div>Cargando...</div>}
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error.details?.errors}
        </div>
      )}
      <section style={{ marginBottom: '30px' }}>
        <h2>Información del Usuario</h2>
        {userResponse ? (
          <div>
            <p>Nombre: {userResponse.first_name}</p>
            <p>Email: {userResponse.email}</p>
            <p>Apellido: {userResponse.last_name}</p>
          </div>
        ) : (
          <p>No se encontraron datos del usuario</p>
        )}
      </section>
    </div>
  )
}

export default ExampleComponentWithAuth
