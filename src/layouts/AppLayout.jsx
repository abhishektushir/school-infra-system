import React from 'react'
import { Outlet } from 'react-router-dom'
import { School } from 'lucide-react'

function AppLayout() {
  return (
      <div className='bg-white text-black min-h-screen'>
          <header className="bg-primary text-primary__foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <School className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-medium">School Infrastructure System</h1>
            <p className="text-sm opacity-90">स्कूल अवसंरचना प्रणाली</p>
          </div>
        </div>
      </header>
          <div className='container p-6 mx-auto'>
              <main><Outlet/></main>
          </div>
          
    </div>
  )
}

export default AppLayout