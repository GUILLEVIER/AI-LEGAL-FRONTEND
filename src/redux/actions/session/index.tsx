import { LOG_IN_START, LOG_OUT_START } from '../../../consts/types'

export const logIn = (payload: any) => ({
  type: LOG_IN_START,
  payload,
})

export const logOut = () => ({
  type: LOG_OUT_START,
})
