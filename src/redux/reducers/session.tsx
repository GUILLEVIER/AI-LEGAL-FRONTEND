import {
  LOG_IN_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
} from '../../consts/types'
import { SessionState } from '../../legal'
import { AuthManager } from '../../utils/AuthManager'

let user = AuthManager.getCurrentUser()

const initialState: SessionState = {
  errors: [],
  fetchStatus: 'NO_FETCH',
  user: user || {},
}

// eslint-disable-next-line
export default (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case LOG_IN_START:
      return {
        ...state,
        fetchStatus: 'FETCHING',
        errors: [],
      }
    case LOG_IN_ERROR:
      console.error('Error during login:', action.payload)
      return {
        ...state,
        // TODO: Definir qué obtener desde la respuesta de la API como error.
        errors: action.payload?.details,
        fetchStatus: 'ERROR',
      }
    case LOG_IN_SUCCESS:
      console.log('Login successful:', action.payload)
      return {
        ...state,
        fetchStatus: 'FETCHED',
        // TODO: Definir qué obtener desde la respuesta de la API como usuario.
        user: action.payload.data.user || {},
        errors: [],
      }
    case LOG_OUT_SUCCESS:
      return {
        ...initialState,
        fetchStatus: 'FETCHED_LOGOUT',
        user: {},
      }
    default:
      return state
  }
}
