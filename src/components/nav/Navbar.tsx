import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import UserInfo from './UserInfo'
import Menu from './Menu'
import SidebarLinks from './SidebarLinks'
import Logo from '../Logo'

export default function Navbar() {
  return (
    <nav className='flex lg:hidden justify-between border-b border-input p-4 bg-background/75 backdrop-blur sticky top-0 w-full z-50'>
      <Logo className='text-secondary-foreground' />
      <Sidesheet />
    </nav>
  )
}

function Sidesheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon'>
          <MenuIcon className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='flex flex-col gap-4'>
        <SheetHeader className='text-left'>
          <SheetTitle>Меню</SheetTitle>
          <div className='flex items-center justify-between'>
            <UserInfo />
            <Menu />
          </div>
        </SheetHeader>
        <div className='overflow-y-auto'>
          <SidebarLinks />
        </div>
      </SheetContent>
    </Sheet>
  )
}
