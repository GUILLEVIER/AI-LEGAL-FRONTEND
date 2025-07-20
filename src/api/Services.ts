import { HttpClient } from './HttpClient'
import { ApiResponse, AuthService } from '../model_interfaces/configInterface'
import { LoginRequest } from '../model_interfaces/apiRequestsInteface'
import { LoginResponse, LogoutResponse, RefreshResponse } from '../model_interfaces/apiResponsesInterface'

export class Services implements AuthService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials - Credenciales del usuario.
   * @returns Promesa con la respuesta de la API.
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.httpClient.post<LoginResponse>('login/', credentials)
  }

  /**
   * Cierra la sesión del usuario.
   * @returns Promesa con la respuesta de la API.
   */
  async logout(): Promise<ApiResponse<LogoutResponse>> {
    return this.httpClient.post<LogoutResponse>('logout/', {})
  }

  /**
   * Refresca el token de acceso.
   * @param refreshToken - El token de refresco.
   * @returns Promesa con la respuesta de la API.
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<RefreshResponse>> {
    return this.httpClient.post<RefreshResponse>('token/refresh/', { refresh: refreshToken })
  }

  /**
   * Realiza una solicitud GET a la API.
   * @param url - La URL del endpoint.
   * @param headers - Encabezados adicionales para la solicitud.
   * @returns Promesa con la respuesta de la API.
   */
  async get<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.httpClient.get<T>(url, headers)
  }

  /**
   * Realiza una solicitud POST a la API.
   * @param url - La URL del endpoint.
   * @param data - Los datos a enviar en el cuerpo de la solicitud.
   * @param headers - Encabezados adicionales para la solicitud.
   * @returns Promesa con la respuesta de la API.
   */
  async post<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.httpClient.post<T>(url, data, headers)
  }

  /**
   * Realiza una solicitud PUT a la API.
   * @param url - La URL del endpoint.
   * @param data - Los datos a enviar en el cuerpo de la solicitud.
   * @param headers - Encabezados adicionales para la solicitud.
   * @returns Promesa con la respuesta de la API.
   */
  async put<T = any>(url: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.httpClient.put<T>(url, data, headers)
  }

  /**
   * Realiza una solicitud DELETE a la API.
   * @param url - La URL del endpoint.
   * @param headers - Encabezados adicionales para la solicitud.
   * @returns Promesa con la respuesta de la API.
   */
  async delete<T = any>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.httpClient.delete<T>(url, headers)
  }
}
