import React, { useState, useRef, useEffect } from 'react'
import { userProfileMenu } from '../data/userProfileMenu'
import { userProfileMenuItems } from '../data/userProfileMenuItems'
import { sessionErrors, sessionStatus } from '../redux/selectors'
import { logOut } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { showToastifySuccess, showToastifyError } from '../utils/showToastify'
import { useNavigate } from 'react-router'
import { SessionState } from '../legal'

const UserProfileMenu: React.FC = () => {
  // USE STATES AND HOOKS
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // REDUX
  const dispatch = useDispatch()
  const errors: string[] = useSelector((state: SessionState) =>
    sessionErrors(state)
  )
  const status: string = useSelector((state: SessionState) =>
    sessionStatus(state)
  )

  // USE EFFECT
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

  useEffect(() => {
    if (status === 'FETCHED_LOGOUT') {
      showToastifySuccess('Cierre de sesión exitoso.')
      navigate('/log_in')
    }
    if (status === 'ERROR') {
      showToastifyError(errors[0])
      navigate('/log_in')
    }
  }, [status])

  // METHODS
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleMenuItemClick = (item: any) => {
    setIsProfileMenuOpen(false)
    // Aquí puedes manejar la lógica de cada elemento del menú
    // Por ejemplo, redirigir a una página específica o realizar una acción
    if (item.id === 'logout') {
      dispatch(logOut())
    } else if (item.id === 'edit-profile') {
    } else if (item.id === 'view-profile') {
    } else if (item.id === 'examples') {
      navigate('/examples')
    }
  }

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
