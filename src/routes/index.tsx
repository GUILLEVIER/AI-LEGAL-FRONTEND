import { Login, SignIn, Dashboard } from '../views'

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
]

export default routes
