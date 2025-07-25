import React, { useState } from 'react'
import { LeftSideMenuProps } from '../model_interfaces/propsInterface'
import { leftSideMenuItems } from '../data/leftSideMenuItems'
import LoadingLogo from '../assets/logos/LoadingLogo.svg?url'
import { useNavigate } from 'react-router'

const LeftSideMenu: React.FC<LeftSideMenuProps> = ({ drawerOpen = true }) => {
  // USE STATES AND HOOKS
  const [activeItem, setActiveItem] = useState<string>('favorites')
  const navigate = useNavigate()

  // METHODS
  const handleItemClick = (item: any) => {
    setActiveItem(item.id)
    // Aquí puedes manejar la lógica de cada elemento del menú
    // Por ejemplo, redirigir a una página específica o realizar una acción
    if (item.id) {
      navigate(`/control-panel/${item.id}`)
    }
  }

  const renderMenuItems = () => {
    return leftSideMenuItems.map((group) => (
      <div key={group.id} className='menu-group'>
        {drawerOpen && group.type === 'group' && (
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
                <span className='menu-icon'>{item.icon}</span>
                {drawerOpen && <span className='menu-label'>{item.label}</span>}
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
