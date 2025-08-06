import React, { useState } from 'react'

export const useControlPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return {
    drawerOpen,
    handleDrawerToggle,
  }
}
