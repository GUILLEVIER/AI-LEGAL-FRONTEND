import React from 'react'
import { userProfileMenu } from '../data/userProfileMenu'
import { useUserProfileMenu } from '../hooks/components/useUserProfileMenu'

const UserProfileMenu: React.FC = () => {
  const {
    menuRef,
    isProfileMenuOpen,
    toggleProfileMenu,
    handleMenuItemClick,
    userProfileMenuItems,
  } = useUserProfileMenu()

  return (
    <div className='user-profile-menu' ref={menuRef}>
      <div className='profile-section'>
        <button className='profile-button' onClick={toggleProfileMenu}>
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
                    onClick={() => handleMenuItemClick(item)}
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
