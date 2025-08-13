import { PasswordChangeRequest } from '../interfaces/apiRequestsInteface'
import { PasswordChangeFormInterface } from '../interfaces/formsInterface'

export const PasswordChangeMapper = {
  toApiPasswordChange: (
    data: PasswordChangeFormInterface
  ): PasswordChangeRequest => ({
    new_password: data.newPassword,
    confirm_password: data.confirmPassword,
  }),
}
