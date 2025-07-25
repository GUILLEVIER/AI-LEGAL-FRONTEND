import React, { useState } from 'react'
import { LeftMenu, Header } from '../components'
import { Outlet } from 'react-router'

const ControlPanel: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

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
