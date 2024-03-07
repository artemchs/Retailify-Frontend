import { Separator } from '@/components/ui/separator'
import SidebarLinks from './SidebarLinks'
import UserInfo from './UserInfo'
import Menu from './Menu'
import { Button } from '../ui/button'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ImperativePanelHandle } from 'react-resizable-panels'

type Props = {
  sidebarRef: React.RefObject<ImperativePanelHandle>
  isExpanded?: boolean
}

export default function Sidebar({ sidebarRef, isExpanded }: Props) {
  return (
    <nav className={cn('hidden lg:flex w-full h-full flex-col')}>
      <div className='p-3 flex items-center justify-between'>
        <div className={cn(isExpanded ? 'flex' : 'hidden')}>
          <UserInfo />
        </div>
        <div className='flex items-center gap-2'>
          <div className={cn(isExpanded ? 'flex' : 'hidden')}>
            <Menu />
          </div>
          <Button
            variant='outline'
            size='icon'
            onClick={() => {
              if (sidebarRef.current?.isExpanded()) {
                sidebarRef.current.collapse()
              } else {
                sidebarRef.current?.expand()
              }
            }}
          >
            {sidebarRef.current?.isCollapsed() ? (
              <PanelLeftOpen className='h-4 w-4' />
            ) : (
              <PanelLeftClose className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>
      <Separator />
      <SidebarLinks isCollapsed={!isExpanded} />
    </nav>
  )
}
