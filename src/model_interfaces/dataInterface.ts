export interface MenuItem {
  id: string
  label: string
  icon: string
  type: 'item' | 'group'
  children?: MenuItem[]
}

export interface UserProfile {
  name: string
  role: string
  email?: string
  avatar?: string
}