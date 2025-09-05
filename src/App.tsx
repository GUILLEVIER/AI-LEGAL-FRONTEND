import '@/assets/styles/App.scss'
import { theme } from '@/assets/styles/theme'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router'
import routes from '@/routes'
import controlPanelNestedRoutes from '@/routes/controlPanelNestedRoutes'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import React from 'react'
import { ControlPanel } from '@/views'

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Provider store={store}>
          <Routes>
            {/* RUTAS SIN UN LAYOUT PREDEFINIDO */}
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* RUTAS CON UN LAYOUT PREDEFINIDO: ControlPanel */}
            <Route path='/control-panel/*' element={<ControlPanel />}>
              {controlPanelNestedRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
