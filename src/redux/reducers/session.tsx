import {
  LOG_IN_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
} from '../../consts/types'
import { SessionState } from '../../legal'

const initialState: SessionState = {
  errors: [],
  fetchStatus: 'NO_FETCH',
  user: {},
}

// eslint-disable-next-line
export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN_START:
      return {
        ...state,
        fetchStatus: 'FETCHING',
        errors: [],
      }
    case LOG_IN_ERROR:
      return {
        ...state,
        // TODO: Definir qué obtener desde la respuesta de la API como error.
        errors: action.payload?.response?.data?.errors || [
          'Error de autenticación',
        ],
        fetchStatus: 'ERROR',
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        fetchStatus: 'FETCHED',
        // TODO: Definir qué obtener desde la respuesta de la API como usuario.
        user: action.payload?.data || {},
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
