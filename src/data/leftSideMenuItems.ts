import { MenuItem } from '../interfaces/dataInterface'

export const leftSideMenuItems: MenuItem[] = [
  {
    id: 'navigation',
    label: 'Navegación',
    icon: '',
    type: 'group',
    children: [
      {
        id: 'favorites',
        label: 'Favoritos',
        icon: '📊',
        type: 'item',
      },
      {
        id: 'templates',
        label: 'Plantillas',
        icon: '📝',
        type: 'item',
      },
      {
        id: 'generation-with-ia',
        label: 'Generación con IA',
        icon: '📝',
        type: 'item',
      },
      {
        id: 'case-analysis',
        label: 'Análisis de casos',
        icon: '📝',
        type: 'item',
      },
      {
        id: 'laws-and-rulings',
        label: 'Leyes y sentencias',
        icon: '📝',
        type: 'item',
      },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilidades',
    icon: '',
    type: 'group',
    children: [
      {
        id: 'reports',
        label: 'Reportes',
        icon: 'Tt',
        type: 'item',
      },
      {
        id: 'recent',
        label: 'Recientes',
        icon: '🎨',
        type: 'item',
      },
      {
        id: 'my-activities',
        label: 'Mis Actividades',
        icon: '🌑',
        type: 'item',
      },
      {
        id: 'manage-users',
        label: 'Gestión de Usuarios',
        icon: '👥',
        type: 'item',
      },
    ],
  },
  {
    id: 'support',
    label: 'Soporte',
    icon: '',
    type: 'group',
    children: [
      {
        id: 'help',
        label: 'Ayuda',
        icon: '📚',
        type: 'item',
      },
    ],
  },
]
