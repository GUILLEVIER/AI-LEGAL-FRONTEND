import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(saga)

export default store
