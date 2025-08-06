import {
  CaseAnalysis,
  Favorites,
  GenerationWithIa,
  LawsAndRulings,
  ManageUsers,
  Profile,
  Templates,
} from '../views'

const controlPanelNestedRoutes = [
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'favorites',
    element: <Favorites />,
  },
  {
    path: 'templates',
    element: <Templates />,
  },
  {
    path: 'generation-with-ia',
    element: <GenerationWithIa />,
  },
  {
    path: 'case-analysis',
    element: <CaseAnalysis />,
  },
  {
    path: 'laws-and-rulings',
    element: <LawsAndRulings />,
  },
  {
    path: 'manage-users',
    element: <ManageUsers />,
  },
]

export default controlPanelNestedRoutes
