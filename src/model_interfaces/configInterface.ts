//import { ErrorTypes } from "../utils/ErrorHandler"
import { LoginRequest } from "./apiRequestsInteface"
import { LoginResponse, LogoutResponse, RefreshResponse } from "./apiResponsesInterface"

// Respuesta de error personalizada de la aplicación REACT
export interface AppError {
  type: string
  status: number
  message: string
  details: ApiGenericResponse
  timestamp: string
}

// Respuesta Generica de la API
// Se genera a partir de la obtención de datos desde AxiosResponse en HttpClient.ts
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
}

export interface ApiGenericResponse<T = any> {
  data: T,
  message: string,
  status: string,
  code: string,
  http_status: number,
  errors: string[]
}

// Interfaz para los servicios de autenticación
// Esto se implementa en Services.ts
export interface AuthService {
  login(credentials: LoginRequest): Promise<ApiResponse<ApiGenericResponse<LoginResponse>>>
  logout(): Promise<ApiResponse<ApiGenericResponse<LogoutResponse>>>
  refreshToken(refreshToken: string): Promise<ApiResponse<ApiGenericResponse<RefreshResponse>>>
}


export interface AuthData {
  authorization: string // Token de Autenticación
  session: any // Session de usuario autenticado
  refreshToken: string // Token de actualización
}

export interface AuthInfo {
  hasToken: boolean
  hasRefreshToken: boolean
  hasSession: boolean
  isAuthenticated: boolean
  currentUser: any // Información del usuario actual, si está disponible
}