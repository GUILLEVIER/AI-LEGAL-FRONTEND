// Data model from API responses
// API - login - data
export interface LoginResponse {
  user: {
    pk: number
    username: string
    email: string
    first_name: string
    last_name: string
  }
  access: string
  refresh: string
}

// API - users - data
export interface UsersResponse {
  count: number
  next: null
  previous: null
  results: User[]
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  empresa: Empresa | null
}

export interface Empresa {
  id: number
  plan: number
  plan_nombre: string
  plan_precio: string
  rut: string
  nombre: string
  correo: string
  fecha_creacion: string
}

export interface UserReponse {
  id: number
  name: string
  email: string
  first_name: string
  last_name: string
  empresa: any
}

// API - logout - data
export interface LogoutResponse {
  detail: string
}

// API - /token/refresh - data
export interface RefreshResponse {
  access: string
  refresh: string
}

export interface UserProfileResponse {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
}
