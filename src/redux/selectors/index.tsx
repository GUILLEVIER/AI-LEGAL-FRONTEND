import { get } from 'lodash'
import { PreviewDocumentState, SessionState } from '../../legal'

// Session
export const sessionErrors = (state: SessionState) =>
  get(state, 'session.errors')
export const sessionResult = (state: SessionState) => get(state, 'session.user')
export const sessionStatus = (state: SessionState) =>
  get(state, 'session.fetchStatus')

// Preview Document
export const previewDocumentResult = (state: PreviewDocumentState) =>
  get(state, 'previewDocument.document')
