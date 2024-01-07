import { Separator } from '@/components/ui/separator'
import SidebarLinks from './SidebarLinks'
import UserInfo from './UserInfo'
import Menu from './Menu'
import ThemeToggle from '@/features/appearance/components/ThemeToggle'

export default function Sidebar() {
  return (
    <div className='hidden lg:flex h-full w-96 flex-col border-r'>
      <div className='p-3 flex items-center justify-between'>
        <UserInfo />
        <div className='flex items-center gap-2'>
          <Menu />
          <ThemeToggle />
        </div>
      </div>
      <Separator />
      <div className='p-3'>
        <SidebarLinks />
      </div>
    </div>
  )
}
