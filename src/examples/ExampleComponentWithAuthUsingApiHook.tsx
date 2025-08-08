import React, { useState, useEffect } from 'react'
import { useUsersApi } from '../hooks/api/apiWithAuth/useUsersApi'
import { UserReponse } from '../interfaces/apiResponsesInterface'

/**
 * Ejemplo de componente que usa el hook useUsersApi
 */
export const ExampleComponentWithAuthUsingApiHook: React.FC = () => {
  const { isLoading, error, getUser } = useUsersApi()
  const [userResponse, setUserResponse] = useState<UserReponse | null>(null)

  useEffect(() => {
    const loadUserData = async (id: string) => {
      const response = await getUser(id)
      if (response && response.data.data) {
        setUserResponse(response.data.data)
      }
    }
    loadUserData('2') // ID de ejemplo, puede ser dinámico
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      {isLoading && <div>Cargando...</div>}
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error.details?.errors}
        </div>
      )}
      <h1>Ejemplo de API con Autenticación</h1>
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

export default ExampleComponentWithAuthUsingApiHook
