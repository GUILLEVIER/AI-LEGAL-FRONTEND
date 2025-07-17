import React from 'react'
import { HeaderProps } from '../model_interfaces'
import UserProfileMenu from './UserProfileMenu'

const Header: React.FC<HeaderProps> = ({
  onDrawerToggle,
  drawerOpen = true,
}) => {
  return (
    <header
      className={`ai-legal-header ${
        drawerOpen ? 'drawer-open' : 'drawer-closed'
      }`}
    >
      <div className='header-content'>
        <div className='header-left'>
          <button
            className='drawer-toggle-btn'
            onClick={onDrawerToggle}
          >
            ☰
          </button>
        </div>
        <UserProfileMenu />
      </div>
    </header>
  )
}

export default Header
