// ARCHIVO QUE CONTIENE LAS INTERFACES DE MAPEOS ENTRE LAS RESPUESTAS DE LA API Y LOS FORMULARIOS

// USERS
export interface UsersResponseMapper {
  count: number
  next: null
  previous: null
  results: UserMapper[]
}

export interface UserMapper {
  id: number
  userName: string
  email: string
  firstName: string
  lastName: string
  company: CompanyMapper | null
  group: string
}

export interface CompanyMapper {
  id: number
  plan: number
  planName: string
  planPrice: string
  rut: string
  name: string
  email: string
  creationDate: string
}

// USER
export interface UserResponseMapper {
  id: number
  name: string
  email: string
  firstName: string
  lastName: string
  company: CompanyMapper | null
}

export interface UserProfileMapper {
  pk: number
  userName: string
  email: string
  firstName: string
  lastName: string
}

// GROUPS
export interface UsersGroupsResponseMapper {
  id: number
  name: string
  permissions: PermissionMapper[] | null
}

export interface PermissionMapper {
  codename: string
  contentType: string
  id: number
  name: string
}

// COMPANIES
export interface CompaniesResponseMapper {
  count: number
  next: null
  previous: null
  results: CompanyMapper[]
}

// LOGIN
export interface LoginResponseMapper {
  user: UserProfileMapper
  access: string
  refresh: string
}

// LOGOUT
export interface LogoutResponseMapper {
  detail: string
}

// REFRESH TOKEN
export interface RefreshResponseMapper {
  access: string
  refresh: string
}

// UPLOADED DOCUMENT
export interface UploadDocumentResponseMapper {
  id: number
  extractedText: string
  type: string
  originalName: string
  fileUrl: string
  uploadDate: string
}

// UPLOADED DOCUMENTS
export interface UploadedDocumentMapper {
  id: number
  user: number
  originalName: string
  type: string
  fileUrl: string
  uploadDate: string
}

// AVAILABLE FIELDS
export interface AvailableFieldsResponseMapper {
  count: number
  next: null
  previous: null
  results: AvailableFieldMapper[]
}

export interface AvailableFieldMapper {
  id: number
  name: string
  dataType: string
}

// TEMPLATE
export interface TemplateMapper {
  id: number
  name: string
  description: string
  htmlWithFields: string
  type?: TemplateTypeMapper
  typeInfo?: {
    id: number
    name: string
  }
  creationDate: string
  associatedFields: TemplateFieldMapper[]
  isFavorite?: boolean
  favoriteAddedDate?: string
  user: number
}

export interface TemplateFieldMapper {
  id: number
  field: number
  variableName: string
  fieldName: string
  fieldType: string
}

// CREATE TEMPLATE
export interface CreateTemplateResponseMapper {
  id: number
}

// GENERATE DOCUMENT
export interface GenerateDocumentResponseMapper {
  id: number
  htmlResult: string
}

// GENERATED DOCUMENTS
export interface GeneratedDocumentsResponseMapper {
  count: number
  next: null
  previous: null
  results: GeneratedDocumentMapper[]
}

export interface GeneratedDocumentMapper {
  id: number
  template: number
  user: number
  filledData: Record<string, any>
  htmlResult: string
  generationDate: string
  templateName: string
  userUsername: string
  name: string
}

// FAVORITE
export interface FavoriteResponseMapper {
  id: number
  template: TemplateMapper
  addedDate: string
  user: number
}

// TEMPLATE TYPES
export interface TemplateTypesResponseMapper {
  count: number
  next: null
  previous: null
  results: TemplateTypeMapper[]
}

export interface TemplateTypeMapper {
  id: number
  name: string
}
