import { Separator } from '@/components/ui/separator'
import SidebarLinks from './SidebarLinks'
import UserInfo from '../navbar/UserInfo'
import Menu from '../navbar/Menu'

export default function Sidebar() {
  return (
    <div className='hidden lg:flex h-full w-96 flex-col border-r'>
      <div className='p-3 flex items-center justify-between'>
        <UserInfo />
        <Menu />
      </div>
      <Separator />
      <div className='p-3'>
        <SidebarLinks />
      </div>
    </div>
  )
}
