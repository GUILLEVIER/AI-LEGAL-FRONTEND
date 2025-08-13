// ARCHIVO QUE CONTIENE TODAS LAS RESPUESTAS DE LA API
// ESTO ES LO QUE DEVUELVE LA API, POR LO TANTO, LOS DATOS RECIBIDOS DESDE
// EL BACKEND DEBEN COINCIDIR A ESTA ESTRUCTURA.

// NO MODIFICAR
// API - login - data
export interface LoginResponse {
  user: UserProfile
  access: string
  refresh: string
}

// NO MODIFICAR
// API - logout - data
export interface LogoutResponse {
  detail: string
}

// NO MODIFICAR
// API - /token/refresh - data
export interface RefreshResponse {
  access: string
  refresh: string
}

// UsersResponseMapper
// API - usuarios - data
export interface UsersResponse {
  count: number
  next: null
  previous: null
  results: User[]
}

// UserMapper
export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  empresa: Company | null
  grupos: string
}

// CompanyMapper
export interface Company {
  id: number
  plan: number
  plan_nombre: string
  plan_precio: string
  rut: string
  nombre: string
  correo: string
  fecha_creacion: string
}

// UserResponseMapper
export interface UserResponse {
  id: number
  name: string
  email: string
  first_name: string
  last_name: string
  empresa: Company | null
}

// UserProfileMapper
export interface UserProfile {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
}

// UsersGroupsResponseMapper
// API - groups - data

// UsersGroupsResponseMapper
export interface UsersGroupsResponse {
  id: number
  name: string
  permissions: Permission[]
}

// PermissionMapper
export interface Permission {
  codename: string
  content_type: string
  id: number
  name: string
}

// CompaniesResponseMapper
// API - /companies/v1/empresas/ - data
export interface CompaniesResponse {
  count: number
  next: null
  previous: null
  results: Company[]
}
