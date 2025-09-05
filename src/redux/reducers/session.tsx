import {
  LOG_IN_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT_SUCCESS,
} from '@/consts/types'
import { SessionState } from '@/legal'
import { AuthManager, ClearReason } from '@/utils/AuthManager'

const initialState: SessionState = {
  errors: [],
  fetchStatus: 'NO_FETCH',
  user: AuthManager.getCurrentUser() || {},
}

// eslint-disable-next-line
export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LOG_IN_START:
      return {
        ...state,
        fetchStatus: 'FETCHING',
        errors: [],
      }
    case LOG_IN_ERROR:
      console.log('LOG_IN_ERROR', action.payload)
      return {
        ...state,
        errors: action.payload?.details?.errors || ['Error al iniciar sesión'],
        fetchStatus: 'ERROR',
      }
    case LOG_IN_SUCCESS:
      // TODO: AGREGAR EL MAPPER DE USUARIO A ALMACENAR.
      return {
        ...state,
        fetchStatus: 'FETCHED',
        user: action.payload?.data?.data?.user || {},
        errors: [],
      }
    case LOG_OUT_ERROR:
      console.log('LOG_OUT_ERROR', action.payload)
      AuthManager.clearAuth(ClearReason.USER_LOGOUT)
      return {
        ...state,
        fetchStatus: 'ERROR',
        errors: action.payload?.details?.errors || ['Error al cerrar sesión'],
        user: {},
      }
    case LOG_OUT_SUCCESS:
      AuthManager.clearAuth(ClearReason.USER_LOGOUT)
      return {
        ...initialState,
        fetchStatus: 'FETCHED_LOGOUT',
        user: {},
      }
    default:
      return state
  }
}
