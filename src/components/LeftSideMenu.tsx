import React from 'react'
import { LeftSideMenuProps } from '../interfaces/propsInterface'
import LoadingLogo from '../assets/logos/LoadingLogo.svg?url'
import { useLeftSideMenu } from '../hooks/components/useLeftSideMenu'

const LeftSideMenu: React.FC<LeftSideMenuProps> = ({ drawerOpen = false }) => {
  const { activeItem, handleItemClick, leftSideMenuItems } = useLeftSideMenu()

  const renderMenuItems = () => {
    return leftSideMenuItems.map((group) => (
      <div key={group.id} className='menu-group'>
        {group.type === 'group' && (
          <div className='group-label'>{group.label}</div>
        )}
        <ul className='menu-list'>
          {group.children?.map((item) => (
            <li key={item.id} className='menu-item'>
              <button
                className={`menu-button ${
                  activeItem === item.id ? 'active' : ''
                }`}
                onClick={() => handleItemClick(item)}
                title={!drawerOpen ? item.label : undefined}
              >
                {drawerOpen ? (
                  <>
                    <span className='menu-icon'>{item.icon}</span>
                    <span className='menu-label'>{item.label}</span>
                  </>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      padding: 0,
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', margin: 0 }}>
                      {item.icon}
                    </span>
                    <span style={{ fontSize: '0.75rem', margin: 0 }}>
                      {item.label}
                    </span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))
  }

  return (
    <div className={`drawer ${drawerOpen ? 'open' : 'closed'}`}>
      <div className='drawer-header'>
        <div className='logo-section'>
          <span className='logo-icon'>
            <img src={LoadingLogo} alt='logo-loading' />
          </span>
          {drawerOpen && <span className='logo-text'>AI LEGAL</span>}
        </div>
      </div>
      <div className='drawer-content'>
        <nav className='navigation'>{renderMenuItems()}</nav>
      </div>
    </div>
  )
}

export default LeftSideMenu
