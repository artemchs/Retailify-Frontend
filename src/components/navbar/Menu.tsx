import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { LogOut, MoreHorizontal } from 'lucide-react'
import LogOutAlertDialog from '@/features/auth/log-out/LogOutAlertDialog'
import { useState } from 'react'

export default function Menu() {
  const [isLogOutDialogOpened, setIsLogOutDialogOpened] = useState(false)

  return (
    <>
      <LogOutAlertDialog
        isOpened={isLogOutDialogOpened}
        setIsOpened={setIsLogOutDialogOpened}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Меню</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsLogOutDialogOpened(true)}>
            <LogOut className='h-4 w-4 mr-2' />
            Выйти из аккаунта
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
