import { GroupTypesInterface } from './dataInterface'

// Login
export interface LoginFormInterface {
  email: string
  password: string
  remember: boolean
  showPassword: boolean
}

// Manage Users
export interface ManageUsersFormInterface {
  firstName: string
  lastName: string
  userName: string
  email: string
  empresa: string
  groupTypes: GroupTypesInterface[]
  groupType: string
}
