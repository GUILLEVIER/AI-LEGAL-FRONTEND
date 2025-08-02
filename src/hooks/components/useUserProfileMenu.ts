import React, { useState, useRef, useEffect } from 'react'
import { sessionErrors, sessionStatus } from '../../redux/selectors'
import { logOut } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  showToastifySuccess,
  showToastifyError,
} from '../../utils/showToastify'
import { useNavigate } from 'react-router'
import { SessionState } from '../../legal'
import { userProfileMenuItems } from '../../data/userProfileMenuItems'

export const useUserProfileMenu = () => {
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
      navigate('/log-in')
    }
    if (status === 'ERROR') {
      showToastifyError(errors[0])
      navigate('/log-in')
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
    } else if (item.id === 'profile') {
      navigate('/control-panel/profile')
    }
  }

  return {
    menuRef,
    isProfileMenuOpen,
    toggleProfileMenu,
    handleMenuItemClick,
    userProfileMenuItems,
  }
}
