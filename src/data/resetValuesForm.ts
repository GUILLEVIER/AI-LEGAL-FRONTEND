import { ManageUsersFormInterface } from '../interfaces/formsInterface'

export const resetValuesManageUserForm: ManageUsersFormInterface = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  empresa: '',
  groupTypes: [
    { name: 'ABOGADO' },
    { name: 'ABOGADO_DEFENSOR' },
    { name: 'ABOGADO_GENERAL' },
    { name: 'ABOGADO_ASISTENTE' },
  ],
  groupType: '',
}
