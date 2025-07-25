import { Login, SignIn, ControlPanel, Examples, TokenValidationExample, AppWithAuthExample } from '../views'

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/log-in',
    element: <Login />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/examples',
    element: <Examples />,
  },
  {
    path: '/examples/token-validation',
    element: <TokenValidationExample />,
  },
  {
    path: '/examples/api-with-auth',
    element: <AppWithAuthExample />,
  }
]

export default routes
