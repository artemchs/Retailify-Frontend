import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getNameShorthand } from '@/utils/getNameShorthand'

export default function UserInfo() {
  const { user } = useAuth()

  return (
    <div className='flex gap-2 items-center'>
      <Avatar className='h-full aspect-square'>
        <AvatarImage />
        <AvatarFallback>
          {getNameShorthand(user?.fullName ? user.fullName : '')}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='font-medium'>{user?.fullName}</span>
        <span className='text-xs text-muted-foreground'>Admin</span>
      </div>
    </div>
  )
}
