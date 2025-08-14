// ARCHIVO QUE CONTIENE LAS INTERFACES DE LOS FORMULARIOS DE LAS VISTAS Y/O COMPONENTES

// Login
export interface LoginFormInterface {
  email: string
  password: string
  remember: boolean
  showPassword: boolean
}

// Manage Users
export interface ManageUsersFormInterface {
  userId: number
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  company: {
    name: string
    id: number
  }
  group: string
  showPassword: boolean
}

export interface PasswordChangeFormInterface {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
