import React from 'react'
import { Header, LeftSideMenu } from '@/components'
import { Outlet } from 'react-router'
import { useControlPanel } from '@/hooks/views/useControlPanel'

const ControlPanel: React.FC = () => {
  const { drawerOpen, handleDrawerToggle } = useControlPanel()

  return (
    <div className='control-panel-layout'>
      <Header onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
      <LeftSideMenu drawerOpen={drawerOpen} />
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
