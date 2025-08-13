import {
  Login,
  SignIn,
  Examples,
  TokenValidationExample,
  AppWithAuthExample,
  AppWithAuthUsingApiHookExample,
  AppWithAuthUsingDocumentsApiExample,
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
  {
    path: '/examples/documents',
    element: <AppWithAuthUsingDocumentsApiExample />,
  },
]

export default routes
