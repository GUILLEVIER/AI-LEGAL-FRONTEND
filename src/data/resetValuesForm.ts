// ARCHIVO QUE CONTIENE LOS VALORES POR DEFECTO DE FORMULARIOS UTILIZADOS EN LA APLICACIÓN.

import {
  ManageUsersFormInterface,
  PasswordChangeFormInterface,
} from '../interfaces/formsInterface'
import { LoginFormInterface } from '../interfaces/formsInterface'

export const resetValuesManageUserForm: ManageUsersFormInterface = {
  userId: 0,
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  company: {
    name: 'Sin empresa',
    id: 0,
  },
  group: 'Sin grupo',
  showPassword: false,
}

export const resetValues: LoginFormInterface = {
  email: '',
  password: '',
  remember: true,
  showPassword: false,
}

export const resetValuesPasswordChangeForm: PasswordChangeFormInterface = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}
