// Data model from API responses
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

export interface LogoutResponse {
  detail: string
}

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
