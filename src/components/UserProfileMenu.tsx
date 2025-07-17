import React, { useState, useRef, useEffect } from 'react'
import { userProfileMenu } from '../data/userProfileMenu'
import { userProfileMenuItems } from '../data/userProfileMenuItems'

const UserProfileMenu: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsProfileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='user-profile-menu' ref={menuRef}>
        <div className='profile-section'>
          <button
            className='profile-button'
            onClick={toggleProfileMenu}
          >
            <div className='profile-avatar'>{userProfileMenu.avatar}</div>
            <div className='profile-info'>
              <span className='profile-name'>{userProfileMenu.name}</span>
              <span className='profile-role'>{userProfileMenu.role}</span>
            </div>
          </button>
          {isProfileMenuOpen && (
            <div className='profile-dropdown'>
              <div className='dropdown-header'>
                <div className='user-avatar-large'>{userProfileMenu.avatar}</div>
                <div className='user-details'>
                  <h4>{userProfileMenu.name}</h4>
                  <p>{userProfileMenu.role}</p>
                </div>
              </div>
              <div className='dropdown-divider'></div>
              <ul className='dropdown-menu'>
                {userProfileMenuItems.map((item) => (
                  <li key={item.id} className='dropdown-item'>
                    <button
                      className='dropdown-button'
                      onClick={() => handleMenuItemClick()}
                    >
                      <span className='item-icon'>{item.icon}</span>
                      <span className='item-label'>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    </div>
  )
}

export default UserProfileMenu
