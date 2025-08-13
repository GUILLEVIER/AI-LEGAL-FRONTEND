import {
  showToastifyError,
  showToastifySuccess,
} from '../../../utils/showToastify'
import { useApiWithAuth } from '../../../hooks/utils/useApiWithAuth'
import { sessionResult } from '../../../redux/selectors'
import { useSelector } from 'react-redux'
import { SessionState } from '../../../legal'
import React, { useState } from 'react'
import { PasswordChangeFormInterface } from '../../../interfaces/formsInterface'
import { resetValuesPasswordChangeForm } from '../../../data/resetValuesForm'
import { PasswordChangeMapper } from '../../../mapper/PasswordChangeMapper'

export const useProfile = () => {
  // HOOKS
  const {
    isLoading,
    error,
    getWithAuth,
    postWithAuth,
    putWithAuth,
    deleteWithAuth,
  } = useApiWithAuth()

  // USE STATE
  const [open, setOpen] = useState(false)
  const [passwordChange, setPasswordChange] =
    useState<PasswordChangeFormInterface>(resetValuesPasswordChangeForm)

  // REDUX
  const user: any = useSelector((state: SessionState) => sessionResult(state))

  // METHODS
  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setPasswordChange(resetValuesPasswordChangeForm)
  }

  const handleChangePasswordChange =
    (prop: keyof any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordChange({ ...passwordChange, [prop]: event.target.value })
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    changePassword()
  }

  const changePassword = async () => {
    if (passwordChange.newPassword === passwordChange.confirmPassword) {
      const response = await postWithAuth(
        '/password/change',
        PasswordChangeMapper.toApiPasswordChange(passwordChange)
      )
      if (response && response.data) {
        setOpen(false)
        setPasswordChange(resetValuesPasswordChangeForm)
        showToastifySuccess(response.data.message)
      } else {
        if (error) {
          showToastifyError(error.details?.errors[0])
        }
      }
    } else {
      showToastifyError('Las contraseñas no coinciden.')
    }
  }

  return {
    user,
    setOpen,
    handleCloseModal,
    handleSubmit,
    passwordChange,
    isLoading,
    handleChangePasswordChange,
    open,
  }
}
