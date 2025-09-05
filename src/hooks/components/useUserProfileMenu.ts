import React, { useState, useRef, useEffect } from 'react'
import { sessionErrors, sessionResult, sessionStatus } from '@/redux/selectors'
import { logOut } from '@/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { showToastifySuccess, showToastifyError } from '@/utils/showToastify'
import { useNavigate } from 'react-router'
import { SessionState } from '@/legal'
import { userProfileMenuItems } from '@/data/userProfileMenuItems'
import { UserProfile } from '@/interfaces/dataInterface'

export const useUserProfileMenu = () => {
  // USE STATES AND HOOKS
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [userProfileMenu, setUserProfileMenu] = useState<UserProfile>({
    name: 'Pablo Lopez',
    role: 'Abogado Integrales',
    email: 'pablo.lopez@abogadosintegrales.cl',
    avatar: '👤',
  })
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
  const userProfile: any = useSelector((state: SessionState) =>
    sessionResult(state)
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

  useEffect(() => {
    if (userProfile) {
      const userProfileMenu: UserProfile = {
        name: userProfile.first_name + ' ' + userProfile.last_name,
        role: 'Abogado Integrales',
        email: userProfile.email,
        avatar: '👤',
      }
      setUserProfileMenu(userProfileMenu)
    }
  }, [userProfile])

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
    userProfileMenu,
  }
}
