import Users from '@/api/services/Users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getNameShorthand } from '@/utils/getNameShorthand'
import { Skeleton } from '../ui/skeleton'
import { XOctagon } from 'lucide-react'

export default function UserInfo() {
  const { data, isLoading, isError } = Users.useGetMe()

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <div className='flex items-center space-x-4'>
      <Avatar className='h-full aspect-square'>
        <AvatarImage
          src={data?.profilePicture ? data.profilePicture : undefined}
        />
        <AvatarFallback>
          {getNameShorthand(data?.fullName ? data.fullName : '')}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span>{data?.fullName}</span>
        <span className='text-xs text-muted-foreground'>Admin</span>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-36' />
        <Skeleton className='h-3 w-20' />
      </div>
    </div>
  )
}

function Error() {
  return (
    <div className='flex text-destructive items-center gap-2 w-fit h-full p-2 rounded border border-destructive'>
      <XOctagon />
      Произошла ошибка
    </div>
  )
}
