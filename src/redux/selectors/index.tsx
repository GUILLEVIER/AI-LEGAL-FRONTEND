import { get } from 'lodash'
import { SessionState } from '../../legal'

// Session
export const sessionErrors = (state: SessionState) =>
  get(state, 'session.errors')
export const sessionResult = (state: SessionState) => get(state, 'session.user')
export const sessionStatus = (state: SessionState) =>
  get(state, 'session.fetchStatus')
