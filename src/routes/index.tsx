import {
  Login,
  SignIn,
  Examples,
  TokenValidationExample,
  AppWithAuthExample,
  AppWithAuthUsingApiHookExample,
} from '../views'

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
  },
  {
    path: '/examples/api-with-auth-using-hook',
    element: <AppWithAuthUsingApiHookExample />,
  },
]

export default routes
