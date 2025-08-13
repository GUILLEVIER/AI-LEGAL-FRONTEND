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
