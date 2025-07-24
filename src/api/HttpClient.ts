import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ApiGenericResponse, ApiResponse } from '../model_interfaces/configInterface'
import { AuthManager } from '../utils/AuthManager'
import { ErrorHandler } from '../utils/ErrorHandler'

/**
 * Flujo de datos:
 * AxiosResponse → ApiResponse → ApiGenericResponse → Datos específicos (LoginResponse, LogoutResponse, etc.)
 * AxiosResponse: La respuesta nativa de Axios
 * ApiResponse: Tu interfaz que mapea status, statusText y data
 * ApiGenericResponse: La estructura estándar de tu backend (data, message, status, code, etc.)
 * Datos específicos: Los datos reales (como LoginResponse, LogoutResponse, etc.)
 */
export class HttpClient {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000
    })
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = AuthManager.getToken()
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error: AxiosError) => {
        // Utilizar la clase ErrorHandler para manejar errores
        // Aquí se puede integrar ErrorHandler para mapear errores de Axios a AppError
        return Promise.reject(ErrorHandler.mapAxiosErrorToAppError(error as AxiosError))
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // Manejo de errores globales. Esto se puede personalizar según las necesidades.
        // Utilizar Códigos de error específicos.
        // Utilizar la clase ErrorHandler para manejar errores
        // Aquí se puede integrar ErrorHandler para mapear errores de Axios a AppError
        return Promise.reject(ErrorHandler.mapAxiosErrorToAppError(error as AxiosError))
      }
    )
  }

  async get<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<ApiGenericResponse<T>>> {
    try {
      // Esto corresponde al AXIOS RESPONSE
      const response = await this.api.get<ApiGenericResponse<T>>(url, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async post<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<ApiGenericResponse<T>>> {
    try {
      const response = await this.api.post<ApiGenericResponse<T>>(url, data, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async put<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<ApiGenericResponse<T>>> {
    try {
      const response = await this.api.put<ApiGenericResponse<T>>(url, data, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async delete<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<ApiGenericResponse<T>>> {
    try {
      const response = await this.api.delete<ApiGenericResponse<T>>(url, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      throw error as AxiosError
    }
  }
}
