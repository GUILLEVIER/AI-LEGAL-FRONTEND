import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ApiResponse } from '../model_interfaces/configInterface'
import { AuthManager } from '../utils/AuthManager'

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
        config.headers['Accept'] = 'application/json'
        config.headers['Cache-Control'] = 'no-cache'
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // Manejo de errores globales. Esto se puede personalizar según las necesidades.
        // Utilizar Códigos de error específicos.
        return Promise.reject(error)
      }
    )
  }

  async get<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async post<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async put<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<T>(url, data, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (error) {
      throw error as AxiosError
    }
  }

  async delete<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<T>(url, { headers })
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (error) {
      throw error as AxiosError
    }
  }
}