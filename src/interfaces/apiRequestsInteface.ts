// ARCHIVO QUE CONTIENE TODAS LAS ESTRUCTURAS DE LAS PETICIONES A LA API
// ESTO ES LO QUE RECIBIRÁ LA API, POR LO TANTO, LOS DATOS TRABAJADOS DESDE
// EL FRONTEND DEBEN ADAPTARSE A ESTA ESTRUCTURA

// NO MODIFICAR
// API Credentials
export interface LoginRequest {
  username: string
  email: string
  password: string
}

// EDITAR USUARIO
export interface UserUpdateRequest {
  username: string
  first_name: string
  last_name: string
  email: string
  empresa: number | null
  password: string
}

// CAMBIO DE CONTRASEÑA
export interface PasswordChangeRequest {
  new_password: string
  confirm_password: string
}
