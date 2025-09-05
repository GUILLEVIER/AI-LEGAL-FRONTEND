import { UploadedFile } from '@/interfaces/propsInterface'

export interface LegalReduxStates {
  session: SessionState
}

export type SessionState = {
  errors: Array<any>
  fetchStatus: string
  user: any
}

export type PreviewDocumentState = {
  document: UploadedFile | null
}
