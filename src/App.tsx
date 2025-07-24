import './assets/styles/App.scss'
import { theme } from './assets/styles/theme'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router'
import routes from './routes'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import store from './redux/store'
import React from 'react'

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Provider store={store}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
