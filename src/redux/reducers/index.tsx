import { combineReducers } from 'redux'
import session from './session'
import previewDocument from './previewDocument'

export default combineReducers({
  session,
  previewDocument,
  // Add other reducers here as needed
})
