import { useState, useCallback } from 'react'
import ApiFactory from '../../api/ApiFactory'
import {
  ApiResponse,
  ApiGenericResponse,
  AppError,
} from '../../interfaces/configInterface'
import { useTokenValidator } from './useTokenValidator'

/**
 * Hook personalizado para realizar llamadas a la API con verificación automática de token
 */
export const useApiWithAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  // TODO: AQUÍ PODRIAMOS SOLO LIBERAR EL MENSAJE DE ERROR Y NO TODA LA ESTRUCTURA DEL ERROR.
  const [error, setError] = useState<AppError | null>(null)
  const { isTokenValid, validateAndRefreshToken } = useTokenValidator()

  /**
   * Ejecuta una llamada a la API con verificación automática de token
   */
  const executeWithAuth = useCallback(
    async <T = any>(
      apiCall: () => Promise<ApiResponse<ApiGenericResponse<T>>>
    ): Promise<ApiResponse<ApiGenericResponse<T>> | null> => {
      setIsLoading(true)
      setError(null)
      try {
        // Paso 1: Verificar token actual
        const isTokenValidResult = await isTokenValid()
        if (!isTokenValidResult) {
          console.log('🔐 Token invalid, attempting refresh...')
          // Paso 2: Intentar renovar token
          const refreshSuccessful = await validateAndRefreshToken()
          // Si la renovación falla, retronar null, debido a que no se puede continuar sin un token válido
          // En validateAndRefreshToken se maneja el caso de limpiar la sesión si no hay token
          if (!refreshSuccessful) {
            return null
          }
        }
        // Paso 3: Ejecutar la llamada original
        const result = await apiCall()
        console.log('API call successful:', result)
        return result
      } catch (error: any) {
        console.log('Error executing API call:', error)
        setError(error)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  /**
   * Métodos de conveniencia para diferentes tipos de llamadas HTTP con autenticación.
   */
  const getWithAuth = useCallback(
    async <T = any>(
      url: string,
      headers?: Record<string, string>
    ): Promise<ApiResponse<ApiGenericResponse<T>> | null> => {
      return executeWithAuth(() => {
        const services = ApiFactory.getServices()
        return services.get<T>(url, headers)
      })
    },
    [executeWithAuth]
  )

  const postWithAuth = useCallback(
    async <T = any>(
      url: string,
      data: any,
      headers?: Record<string, string>
    ): Promise<ApiResponse<ApiGenericResponse<T>> | null> => {
      return executeWithAuth(() => {
        const services = ApiFactory.getServices()
        return services.post<T>(url, data, headers)
      })
    },
    [executeWithAuth]
  )

  const putWithAuth = useCallback(
    async <T = any>(
      url: string,
      data: any,
      headers?: Record<string, string>
    ): Promise<ApiResponse<ApiGenericResponse<T>> | null> => {
      return executeWithAuth(() => {
        const services = ApiFactory.getServices()
        return services.put<T>(url, data, headers)
      })
    },
    [executeWithAuth]
  )

  const deleteWithAuth = useCallback(
    async <T = any>(
      url: string,
      headers?: Record<string, string>,
      data?: any
    ): Promise<ApiResponse<ApiGenericResponse<T>> | null> => {
      return executeWithAuth(() => {
        const services = ApiFactory.getServices()
        return services.delete<T>(url, headers, data)
      })
    },
    [executeWithAuth]
  )

  return {
    isLoading,
    error,
    executeWithAuth,
    getWithAuth,
    postWithAuth,
    putWithAuth,
    deleteWithAuth,
  }
}
