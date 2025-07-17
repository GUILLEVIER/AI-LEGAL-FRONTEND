import {
  LOG_IN_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
} from '../../consts/types'
import { SessionState } from '../../legal'

let session =
  localStorage.getItem('session') || sessionStorage.getItem('session')
let user = session !== null ? JSON.parse(session) : {}

const initialState: SessionState = {
  errors: [],
  fetchStatus: 'NO_FETCH',
  user: user,
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN_START:
      return { ...state, fetchStatus: 'FETCHING' }
    case LOG_IN_ERROR:
      return {
        ...state,
        errors: action.error.response.data.errors,
        fetchStatus: 'ERROR',
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        fetchStatus: 'FETCHED',
        user: action.sessionResponse.data.data,
      }
    case LOG_OUT_SUCCESS:
      localStorage.clear()
      sessionStorage.clear()
      return { ...initialState, fetchStatus: 'FETCHED_LOGOUT' }
    default:
      return state
  }
}
