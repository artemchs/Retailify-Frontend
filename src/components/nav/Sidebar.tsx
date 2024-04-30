import { Separator } from '@/components/ui/separator'
import SidebarLinks from './SidebarLinks'
import UserInfo from './UserInfo'
import Menu from './Menu'
import { Button } from '../ui/button'
import { toggleDesktopSidebar } from '@/utils/desktop-sidebar'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export default function Sidebar() {
  return (
    <nav
      className='hidden lg:flex h-full flex-col border-r data-[state=open]:w-96 data-[state=closed]:w-fit group'
      data-state='open'
      id='sidebar-desktop'
    >
      <div className='p-3 flex items-center justify-between'>
        <div className='group-data-[state=closed]:hidden'>
          <UserInfo />
        </div>
        <div className='flex items-center gap-2'>
          <div className='group-data-[state=closed]:hidden'>
            <Menu />
          </div>
          <Button
            size='icon'
            variant='outline'
            onClick={() => toggleDesktopSidebar()}
          >
            <>
              <PanelLeftOpen className='hidden h-4 w-4 group-data-[state=closed]:flex' />
              <PanelLeftClose className='hidden h-4 w-4 group-data-[state=open]:flex' />
            </>
          </Button>
        </div>
      </div>
      <Separator />
      <SidebarLinks />
    </nav>
  )
}
