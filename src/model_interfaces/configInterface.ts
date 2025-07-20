//import { ErrorTypes } from "../utils/ErrorHandler"
import { LoginRequest } from "./apiRequestsInteface"
import { LoginResponse, LogoutResponse, RefreshResponse } from "./apiResponsesInterface"

// Respuesta de error personalizada de la aplicación REACT
export interface AppError {
  type: string
  status: number
  message: string
  details: any
  timestamp: string
}

// Respuesta Generica de la API
// Se genera a partir de la obtención de datos desde AxiosResponse en HttpClient.ts
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
}

// Interfaz para los servicios de autenticación
// Esto se implementa en Services.ts
export interface AuthService {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>>
  logout(): Promise<ApiResponse<LogoutResponse>>
  refreshToken(refreshToken: string): Promise<ApiResponse<RefreshResponse>>
}


export interface AuthData {
  authorization: string // Token de Autenticación
  session: any // Session de usuario autenticado
  refreshToken: string // Token de actualización
}