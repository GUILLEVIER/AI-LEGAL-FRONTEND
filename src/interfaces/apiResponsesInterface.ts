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

// REVISAR CON PRECAUCIÓN

// Documents API Responses

// UploadedDocumentResponseMapper
// API - /documents/v1/documentos-subidos/subir_documento/ - data
// PROBADO
export interface UploadDocumentResponse {
  id: number
  texto_extraido: string
  tipo: string
  nombre_original: string
  archivo_url: string
  fecha_subida: string
}

// UploadedDocumentsResponseMapper
// API - /documents/v1/documentos-subidos/ - data
// PROBADO
// UploadedDocumentsResponseMapper
// API - /documents/v1/documentos-subidos/ - data
// PROBADO
export interface UploadedDocument {
  id: number
  usuario: number
  nombre_original: string
  tipo: 'pdf' | 'imagen' | 'texto'
  archivo_url: string
  fecha_subida: string
}

// AvailableFieldsResponseMapper
// API - /documents/v1/campos-disponibles/ - data
// PROBADO
export interface AvailableFieldsResponse {
  count: number
  next: null
  previous: null
  results: AvailableField[]
}

// CreateAvailableFieldResponseMapper
// API - /documents/v1/campos-disponibles/ POST - data
// PROBADO
export interface AvailableField {
  id: number
  nombre: string
  tipo_dato: 'texto' | 'fecha' | 'numero'
}

// TemplatesResponseMapper
// API - /documents/v1/plantillas-documentos/ - data
// PROBADO
export interface Template {
  id: number
  nombre: string
  descripcion: string
  html_con_campos: string
  tipo?: TemplateType
  tipo_info?: {
    id: number
    nombre: string
  }
  fecha_creacion: string
  campos_asociados: TemplateField[]
  es_favorito?: boolean
  fecha_agregado_favorito?: string // NO VISUALIZO EL USO
  usuario: number
}

// PROBADO
export interface TemplateField {
  id: number
  campo: number
  nombre_variable: string
  campo_nombre: string
  campo_tipo: string
}

// CreateTemplateResponseMapper
// API - /documents/v1/plantillas-documentos/crear_plantilla/ - data
export interface CreateTemplateResponse {
  id: number
}

// GenerateDocumentResponseMapper
// API - /documents/v1/plantillas-documentos/{id}/generar_documento/ - data
// PROBADO
export interface GenerateDocumentResponse {
  id: number
  html_resultante: string
}

// GeneratedDocumentsResponseMapper
// API - /documents/v1/documentos-generados/ - data
// PROBADO
export interface GeneratedDocumentsResponse {
  count: number
  next: null
  previous: null
  results: GeneratedDocument[]
}

// PROBADO
export interface GeneratedDocument {
  id: number
  plantilla: number
  usuario: number
  datos_rellenados: Record<string, any>
  html_resultante: string
  fecha_generacion: string
  plantilla_nombre: string
  usuario_username: string
  nombre: string
}

// FavoriteResponseMapper
// API - /documents/v1/plantillas-favoritas/ - data
// PROBADO
export interface FavoriteResponse {
  id: number
  plantilla: Template
  fecha_agregado: string
  usuario: number
}

// MyFavoritesResponseMapper
// API - /documents/v1/plantillas-favoritas/mis_favoritos/ - data
export interface MyFavoritesResponse {
  data: Template[]
}

// TemplateTypesResponseMapper
// API - /documents/v1/tipos-plantilla/ - data
// PROBADO
export interface TemplateTypesResponse {
  count: number
  next: null
  previous: null
  results: TemplateType[]
}

// PROBADO
export interface TemplateType {
  id: number
  nombre: string
}
