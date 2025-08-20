import {
  PREVIEW_DOCUMENT_DELETE,
  PREVIEW_DOCUMENT_SAVE,
} from '../../../consts/types'
import { UploadedFile } from '../../../interfaces/propsInterface'

export const savePreviewDocument = (payload: UploadedFile | null) => ({
  type: PREVIEW_DOCUMENT_SAVE,
  payload,
})

export const deletePreviewDocument = (payload: UploadedFile | null) => ({
  type: PREVIEW_DOCUMENT_DELETE,
  payload,
})
