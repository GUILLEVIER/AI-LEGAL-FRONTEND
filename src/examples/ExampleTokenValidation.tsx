import React, { useState, useEffect } from 'react'
import { useTokenValidator } from '../hooks/useTokenValidator'

/**
 * Ejemplo de componente que usa el hook useTokenValidator
 * 
 * Útil para pantallas que necesitan validar el token antes de mostrar contenido
 * o para verificaciones puntuales del estado de autenticación
 */
export const ExampleTokenValidation: React.FC = () => {
  const { validateAndRefreshToken, isTokenValid, getAuthStatus } = useTokenValidator()
  
  const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid'>('checking')
  const [authInfo, setAuthInfo] = useState<any>(null)

  /**
   * Validar token al cargar el componente
   */
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateAndRefreshToken()
      setTokenStatus(isValid ? 'valid' : 'invalid')
      setAuthInfo(getAuthStatus())
    }

    checkToken()
  }, [validateAndRefreshToken, getAuthStatus])

  /**
   * Verificar solo si el token es válido (sin renovar)
   */
  const handleQuickTokenCheck = async () => {
    setTokenStatus('checking')
    const isValid = await isTokenValid()
    setTokenStatus(isValid ? 'valid' : 'invalid')
    setAuthInfo(getAuthStatus())
  }

  /**
   * Forzar validación y renovación
   */
  const handleForceValidation = async () => {
    setTokenStatus('checking')
    const isValid = await validateAndRefreshToken()
    setTokenStatus(isValid ? 'valid' : 'invalid')
    setAuthInfo(getAuthStatus())
  }

  /**
   * Actualizar información de autenticación
   */
  const refreshAuthInfo = () => {
    setAuthInfo(getAuthStatus())
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Validación de Token</h1>
      
      {/* Estado del token */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Estado del Token</h2>
        <div style={{ 
          padding: '10px', 
          borderRadius: '5px',
          backgroundColor: 
            tokenStatus === 'valid' ? '#d4edda' : 
            tokenStatus === 'invalid' ? '#f8d7da' : 
            '#d1ecf1',
          color:
            tokenStatus === 'valid' ? '#155724' : 
            tokenStatus === 'invalid' ? '#721c24' : 
            '#0c5460'
        }}>
          {tokenStatus === 'checking' && '🔄 Verificando token...'}
          {tokenStatus === 'valid' && '✅ Token válido'}
          {tokenStatus === 'invalid' && '❌ Token inválido o expirado'}
        </div>
      </section>

      {/* Botones de acción */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Acciones</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleQuickTokenCheck}
            style={{ padding: '8px 16px' }}
          >
            Verificar Token (Solo Validar)
          </button>
          
          <button 
            onClick={handleForceValidation}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white' }}
          >
            Validar y Renovar Token
          </button>
          
          <button 
            onClick={refreshAuthInfo}
            style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white' }}
          >
            Actualizar Info Auth
          </button>
        </div>
      </section>

      {/* Información de autenticación */}
      <section>
        <h2>Información de Autenticación</h2>
        {authInfo ? (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            fontFamily: 'monospace'
          }}>
            <div><strong>¿Tiene Token?:</strong> {authInfo.hasToken ? '✅ Sí' : '❌ No'}</div>
            <div><strong>¿Tiene Refresh Token?:</strong> {authInfo.hasRefreshToken ? '✅ Sí' : '❌ No'}</div>
            <div><strong>¿Tiene Sesión?:</strong> {authInfo.hasSession ? '✅ Sí' : '❌ No'}</div>
            <div><strong>¿Está Autenticado?:</strong> {authInfo.isAuthenticated ? '✅ Sí' : '❌ No'}</div>
            
            {authInfo.currentUser && (
              <div style={{ marginTop: '15px' }}>
                <strong>Usuario Actual:</strong>
                <pre style={{ marginTop: '5px', fontSize: '12px' }}>
                  {JSON.stringify(authInfo.currentUser, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div>Cargando información de autenticación...</div>
        )}
      </section>

      {/* Casos de uso */}
      <section style={{ marginTop: '30px' }}>
        <h2>Casos de Uso</h2>
        <div style={{ backgroundColor: '#e9ecef', padding: '15px', borderRadius: '5px' }}>
          <h3>¿Cuándo usar cada método?</h3>
          <ul>
            <li>
              <strong>validateAndRefreshToken():</strong> Al cargar componentes que requieren autenticación, 
              antes de hacer llamadas importantes a la API.
            </li>
            <li>
              <strong>isTokenValid():</strong> Para verificaciones rápidas sin renovar el token, 
              útil en guards de rutas.
            </li>
            <li>
              <strong>getAuthStatus():</strong> Para obtener información completa del estado 
              de autenticación sin hacer llamadas a la API.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default ExampleTokenValidation
