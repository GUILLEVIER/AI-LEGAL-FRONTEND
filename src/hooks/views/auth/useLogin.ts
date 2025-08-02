import {
  showToastifySuccess,
  showToastifyError,
} from '../../../utils/showToastify'
import { resetValues } from '../../../data/loginForm'
import { useNavigate } from 'react-router'
import {
  sessionErrors,
  sessionResult,
  sessionStatus,
} from '../../../redux/selectors'
import { logIn } from '../../../redux/actions'
import { LoginFormInterface } from '../../../model_interfaces/formsInterface'
import { SessionState } from '../../../legal'
import { useTokenValidator } from '../../../hooks/utils/useTokenValidator'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

export const useLogin = () => {
  // USE STATES AND HOOKS
  const [emailToPasswordRecover, setEmailToPasswordRecover] = useState('')
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<LoginFormInterface>(resetValues)
  const { getAuthStatus } = useTokenValidator()
  const navigate = useNavigate()

  // REDUX
  const dispatch = useDispatch()
  const errors: string[] = useSelector((state: SessionState) =>
    sessionErrors(state)
  )
  const result: any = useSelector((state: SessionState) => sessionResult(state))
  const status: string = useSelector((state: SessionState) =>
    sessionStatus(state)
  )

  // USE EFFECT
  useEffect(() => {
    if (status === 'FETCHED') {
      if (result.first_name && result.last_name) {
        showToastifySuccess(
          `Bienvenido ${result.first_name.toUpperCase()} ${result.last_name.toUpperCase()}.`
        )
      } else {
        showToastifySuccess(`Bienvenido ${result.username.toUpperCase()}.`)
      }
      navigate('/control-panel')
    }
    if (status === 'ERROR') {
      showToastifyError(errors[0])
    }
  }, [status, result, errors])

  useEffect(() => {
    const authStatus = getAuthStatus()
    if (authStatus?.isAuthenticated) {
      navigate('/control-panel')
    }
  }, [])

  // METHODS
  const handleChange =
    (prop: keyof LoginFormInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    prepareDataAndGenerateRequest()
  }

  const handleSubmitPasswordRecover = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    let data = {
      email: emailToPasswordRecover,
    }
    //dispatch(sendToken(data))
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setEmailToPasswordRecover('')
  }

  const prepareDataAndGenerateRequest = () => {
    let data = {
      email: values.email,
      password: values.password,
    }
    let extra = {
      remember: values.remember,
    }
    dispatch(logIn({ data, extra }))
  }
  return {
    handleSubmit,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    setOpen,
    handleCloseModal,
    setEmailToPasswordRecover,
    values,
    setValues,
    open,
    status,
  }
}
