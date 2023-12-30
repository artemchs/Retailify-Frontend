import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Cog, LogOut } from 'lucide-react'
import { useState } from 'react'
import LogOutAlertDialog from '@/features/auth/log-out/LogOutAlertDialog'

export default function Settings() {
  const [isLogOutAlertOpened, setIsLogOutAlertOpened] = useState(false)

  return (
    <>
      <LogOutAlertDialog
        isOpened={isLogOutAlertOpened}
        setIsOpened={setIsLogOutAlertOpened}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Cog className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Настройки</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsLogOutAlertOpened(true)}>
            <LogOut className='h-4 w-4 mr-2' />
            Выйти из аккаунта
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
