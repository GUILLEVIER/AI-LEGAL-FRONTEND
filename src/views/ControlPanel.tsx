import React, { useState } from 'react'
import { LeftMenu, Header } from '../components'
import { Outlet } from 'react-router'
import { useControlPanel } from '../hooks/views/useControlPanel'

const ControlPanel: React.FC = () => {
  const { drawerOpen, handleDrawerToggle } = useControlPanel()

  return (
    <div className='control-panel-layout'>
      <Header onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
      <LeftMenu drawerOpen={drawerOpen} />
      <main
        className={`main-content ${
          drawerOpen ? 'drawer-open' : 'drawer-closed'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default ControlPanel
