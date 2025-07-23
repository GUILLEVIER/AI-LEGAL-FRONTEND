import { put, call, takeLatest } from 'redux-saga/effects'
import {
  LOG_IN_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT_START,
  LOG_OUT_SUCCESS,
} from '../../consts/types'
// Importar ApiFactory y obtener la instancia de servicios
import ApiFactory from '../../api/ApiFactory'
import { ApiGenericResponse, ApiResponse, AppError } from '../../model_interfaces/configInterface'
import {
  LoginResponse,
  LogoutResponse,
} from '../../model_interfaces/apiResponsesInterface'
import { AuthManager, ClearReason } from '../../utils/AuthManager'

// Usar factory para crear el cliente HTTP y obtener servicios
// Esto asegura que siempre se use la misma instancia de servicios
// y se centralice la configuración de la API
const services = ApiFactory.getServices()

export function* logIn({ payload }: any) {
  const { data, extra } = payload
  try {
    const loginResponse: ApiResponse<ApiGenericResponse<LoginResponse>> = yield call(
      [services, services.login],
      data
    )
    yield put({ type: LOG_IN_SUCCESS, payload: loginResponse })
    if (loginResponse && loginResponse.data) {
      AuthManager.storeAuth(
        {
          authorization: loginResponse.data.data.access,
          session: loginResponse.data.data.user,
          refreshToken: loginResponse.data.data.refresh,
        },
        extra.remember
      )
    }
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, payload: error })
  }
}

export function* logOut() {
  try {
    const logOutResponse: ApiResponse<LogoutResponse> = yield call([
      services,
      services.logout,
    ])
    yield put({ type: LOG_OUT_SUCCESS, payload: logOutResponse })
    AuthManager.clearAuth(ClearReason.USER_LOGOUT)
  } catch (error) {
    yield put({ type: LOG_OUT_ERROR, payload: error })
  }
}

export default function* session() {
  yield takeLatest(LOG_IN_START, logIn)
  yield takeLatest(LOG_OUT_START, logOut)
}
