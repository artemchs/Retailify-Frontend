import Sidebar from '@/components/sidebar/Sidebar'
import { Outlet } from '@tanstack/react-router'

export default function Layout() {
  return (
    <div className='h-screen w-screen flex'>
      <Sidebar />
      <div className='w-full h-full overflow-y-auto overflow-x-hidden flex flex-col relative'>
        <div className='p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
