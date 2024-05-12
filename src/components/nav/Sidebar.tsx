import SidebarLinks from './SidebarLinks'
import UserInfo from './UserInfo'
import Menu from './Menu'
import { Button } from '../ui/button'
import { toggleDesktopSidebar } from '@/utils/desktop-sidebar'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'

export default function Sidebar() {
  return (
    <nav
      className='hidden lg:flex h-full flex-col border-r data-[state=open]:w-96 data-[state=closed]:w-fit group'
      data-state='open'
      id='sidebar-desktop'
    >
      <ScrollArea>
        <div className='p-3 bg-background flex items-center justify-between sticky top-0 border-b border-input'>
          <div className='group-data-[state=closed]:hidden'>
            <UserInfo />
          </div>
          <div className='flex items-center gap-2'>
            <div className='group-data-[state=closed]:hidden'>
              <Menu />
            </div>
            <Button
              variant='outline'
              onClick={() => toggleDesktopSidebar()}
              className='h-9 w-9'
            >
              <>
                <PanelLeftOpen className='hidden h-4 w-4 group-data-[state=closed]:flex shrink-0' />
                <PanelLeftClose className='hidden h-4 w-4 group-data-[state=open]:flex shrink-0' />
              </>
            </Button>
          </div>
        </div>
        <SidebarLinks />
      </ScrollArea>
    </nav>
  )
}
