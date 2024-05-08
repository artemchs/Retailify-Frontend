import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import {
  Check,
  KeyRound,
  Laptop,
  LogOut,
  Moon,
  MoreHorizontal,
  Palette,
  Sun,
  User,
} from 'lucide-react'
import LogOutAlertDialog from '@/features/auth/log-out/LogOutAlertDialog'
import { useState } from 'react'
import EditProfileDialog from '@/features/profile/editProfile/EditProfileDialog'
import UpdatePasswordDialog from '@/features/profile/updatePassword/UpdatePasswordDialog'
import { Command, CommandItem, CommandList } from '../ui/command'
import { useTheme } from '@/hooks/useTheme'
import { useRouteContext } from '@tanstack/react-router'

export default function Menu() {
  const [isLogOutDialogOpened, setIsLogOutDialogOpened] = useState(false)
  const [isEditProfileDialogOpened, setIsEditProfileDialogOpened] =
    useState(false)
  const [isUpdatePasswordDialogOpened, setIsUpdatePasswordDialogOpened] =
    useState(false)
  const { user } = useRouteContext({ from: '/layout' })

  const { setTheme, theme } = useTheme()

  return (
    <>
      <LogOutAlertDialog
        isOpened={isLogOutDialogOpened}
        setIsOpened={setIsLogOutDialogOpened}
      />
      <EditProfileDialog
        isOpened={isEditProfileDialogOpened}
        setIsOpened={setIsEditProfileDialogOpened}
      />
      {user?.role === 'ADMIN' && (
        <UpdatePasswordDialog
          isOpened={isUpdatePasswordDialogOpened}
          setIsOpened={setIsUpdatePasswordDialogOpened}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Меню</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditProfileDialogOpened(true)}>
            <User className='h-4 w-4 mr-2' />
            Редактировать профиль
          </DropdownMenuItem>
          {user?.role === 'ADMIN' && (
            <DropdownMenuItem
              onClick={() => setIsUpdatePasswordDialogOpened(true)}
            >
              <KeyRound className='h-4 w-4 mr-2' />
              Изменить пароль
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className='h-4 w-4 mr-2' />
              Тема
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command className='w-44'>
                <CommandList>
                  <CommandItem
                    className='flex items-center justify-between'
                    onSelect={() => setTheme('light')}
                  >
                    <div className='flex items-center gap-2'>
                      <Sun className='h-4 w-4 mr-2' />
                      Светлая
                    </div>
                    {theme === 'light' && <Check className='h-4 w-4' />}
                  </CommandItem>
                  <CommandItem
                    className='flex items-center justify-between'
                    onSelect={() => setTheme('dark')}
                  >
                    <div className='flex items-center gap-2'>
                      <Moon className='h-4 w-4 mr-2' />
                      Темная
                    </div>
                    {theme === 'dark' && <Check className='h-4 w-4' />}
                  </CommandItem>
                  <CommandItem
                    className='flex items-center justify-between'
                    onSelect={() => setTheme('system')}
                  >
                    <div className='flex items-center gap-2'>
                      <Laptop className='h-4 w-4 mr-2' />
                      Системная
                    </div>
                    {theme === 'system' && <Check className='h-4 w-4' />}
                  </CommandItem>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
