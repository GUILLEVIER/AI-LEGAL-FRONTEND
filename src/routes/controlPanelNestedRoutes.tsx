import {
  CaseAnalysis,
  Favorites,
  GenerationWithIa,
  LawsAndRulings,
  ManageUsers,
  Profile,
  Templates,
  DocumentGenerator,
} from '../views'
import InteractiveEditor from '../views/InteractiveEditor'

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
  {
    path: 'interactive-editor',
    element: <InteractiveEditor />,
  },
  {
    path: 'interactive-editor/:documentId',
    element: <InteractiveEditor />,
  },
  {
    path: 'document-generator',
    element: <DocumentGenerator />,
  },
  {
    path: 'document-generator/:templateId',
    element: <DocumentGenerator />,
  },
]

export default controlPanelNestedRoutes
