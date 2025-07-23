import { useCallback } from 'react'
import ApiFactory from '../api/ApiFactory'
import { AuthManager, ClearReason } from '../utils/AuthManager'

/**
 * Hook simple para validación y renovación de tokens
 * 
 * Útil cuando solo necesitas verificar la validez del token
 * sin hacer una llamada específica a la API
 */
export const useTokenValidator = () => {

  /**
   * Valida el token actual y lo renueva si es necesario
   * @returns Promise<boolean> - true si el token es válido o se renovó exitosamente
   */
  const validateAndRefreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const token = AuthManager.getToken()
      if (!token) {
        console.warn('No token found')
        return false
      }

      // Verificar token actual
      const services = ApiFactory.getServices()
      const verifyResponse = await services.verifyToken(token)

      // Si el token es válido, retornar true
      if (verifyResponse.status === 200 && verifyResponse.data.status === 'success') {
        console.log('✅ Token is valid')
        return true
      }

      // Si el token no es válido, intentar renovarlo
      console.log('🔄 Token invalid, attempting refresh...')
      const refreshToken = AuthManager.getRefreshToken()
      
      if (!refreshToken) {
        console.warn('No refresh token available')
        AuthManager.clearAuth(ClearReason.SECURITY_VIOLATION)
        return false
      }

      const refreshResponse = await services.refreshToken(refreshToken)

      if (refreshResponse.status === 200 && 
          refreshResponse.data.status === 'success' && 
          refreshResponse.data.data) {
        
        // Determinar el tipo de storage a usar
        const hadLocalStorage = !!localStorage.getItem('authorization')
        
        // Actualizar tokens
        const authData = {
          authorization: refreshResponse.data.data.access,
          session: AuthManager.getSession(),
          refreshToken: refreshResponse.data.data.refresh
        }

        AuthManager.storeAuth(authData, hadLocalStorage)
        console.log('✅ Token refreshed successfully')
        return true
      }

      // Si llegamos aquí, tanto verify como refresh fallaron
      console.error('❌ Both token verification and refresh failed')
      AuthManager.clearAuth(ClearReason.SECURITY_VIOLATION)
      return false

    } catch (error) {
      console.error('Token validation error:', error)
      AuthManager.clearAuth(ClearReason.SECURITY_VIOLATION)
      return false
    }
  }, [])

  /**
   * Solo verifica si el token actual es válido (no intenta renovar)
   * @returns Promise<boolean> - true si el token es válido
   */
  const isTokenValid = useCallback(async (): Promise<boolean> => {
    try {
      const token = AuthManager.getToken()
      if (!token) return false

      const services = ApiFactory.getServices()
      const response = await services.verifyToken(token)

      return response.status === 200 && response.data.status === 'success'
    } catch (error) {
      console.warn('Token verification failed:', error)
      return false
    }
  }, [])

  /**
   * Obtiene información sobre el estado actual de la autenticación
   */
  const getAuthStatus = useCallback(() => {
    const token = AuthManager.getToken()
    const refreshToken = AuthManager.getRefreshToken()
    const session = AuthManager.getSession()

    return {
      hasToken: !!token,
      hasRefreshToken: !!refreshToken,
      hasSession: !!session,
      isAuthenticated: AuthManager.isAuthenticated(),
      currentUser: AuthManager.getCurrentUser()
    }
  }, [])

  return {
    validateAndRefreshToken,
    isTokenValid,
    getAuthStatus
  }
}
