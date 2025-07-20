import { all } from 'redux-saga/effects'

import session from './session'

function* saga() {
  yield all([session()])
}

export default saga
