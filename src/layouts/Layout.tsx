import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/nav/Sidebar'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Outlet, useRouterState } from '@tanstack/react-router'

export default function Layout() {
  const { location } = useRouterState()

  return (
    <div className='h-screen w-screen flex'>
      <Sidebar />
      <div className='w-full h-full overflow-y-auto overflow-x-hidden flex flex-col relative'>
        <Navbar />
        <div className='p-6 space-y-6'>
          {location.pathname !== '/' && <Breadcrumbs />}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
