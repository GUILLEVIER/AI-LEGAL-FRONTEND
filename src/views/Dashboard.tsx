import React, { useState } from 'react'
import { LeftMenu, Header } from '../components'

const Dashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div className='dashboard-layout'>
      <Header onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
      <LeftMenu
        drawerOpen={drawerOpen}
      />
      <main
        className={`main-content ${
          drawerOpen ? 'drawer-open' : 'drawer-closed'
        }`}
      >
        DASHBOARD
      </main>
    </div>
  )
}

export default Dashboard
