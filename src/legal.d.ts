export interface LegalReduxStates {
  session: SessionState
}

export type SessionState = {
  errors: Array<any>
  fetchStatus: string
  user: any
}
