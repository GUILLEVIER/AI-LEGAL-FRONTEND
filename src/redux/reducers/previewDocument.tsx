import { PREVIEW_DOCUMENT_DELETE, PREVIEW_DOCUMENT_SAVE } from '@/consts/types'
import { PreviewDocumentState } from '@/legal'

const initialState: PreviewDocumentState = {
  document: null,
}

// eslint-disable-next-line
export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case PREVIEW_DOCUMENT_SAVE:
      return {
        ...state,
        document: action.payload
          ? {
              ...action.payload,
              file: action.payload.file
                ? { ...action.payload.file }
                : undefined,
            }
          : null,
      }
    case PREVIEW_DOCUMENT_DELETE:
      return {
        ...state,
        document: null,
      }
    default:
      return state
  }
}
