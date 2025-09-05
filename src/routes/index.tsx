import { Login, SignIn } from '@/views'

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
]

export default routes
