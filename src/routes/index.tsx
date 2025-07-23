import { Login, SignIn, Dashboard, Examples, TokenValidationExample, AppWithAuthExample } from '../views'

const routes = [
  {
    path: '/log_in',
    element: <Login />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
