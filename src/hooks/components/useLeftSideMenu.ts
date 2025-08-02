import { useState } from 'react'
import { useNavigate } from 'react-router'
import { leftSideMenuItems } from '../../data/leftSideMenuItems'

export const useLeftSideMenu = () => {
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

  return {
    activeItem,
    handleItemClick,
    leftSideMenuItems,
  }
}
