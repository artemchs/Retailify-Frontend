import Users from '@/api/services/Users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getNameShorthand } from '@/utils/getNameShorthand'
import { Skeleton } from '../ui/skeleton'
import { XOctagon } from 'lucide-react'
import { useRouteContext } from '@tanstack/react-router'
import roleNames from '@/utils/roleNames'

export default function UserInfo() {
    const { data, isLoading, isError } = Users.useGetMe()
    const context = useRouteContext({
        strict: false,
    })

    if (isLoading) return <Loading />
    if (isError) return <Error />

    return (
        <div className='flex items-center space-x-2 lg:space-x-4'>
            <Avatar className='h-full aspect-square border'>
                <AvatarImage
                    className='object-cover'
                    src={data?.profilePicture ? data.profilePicture : undefined}
                />
                <AvatarFallback>
                    {getNameShorthand(data?.fullName ? data.fullName : '')}
                </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <span className='truncate max-w-40 2xl:max-w-44 text-sm lg:text-base font-medium'>
                    {data?.fullName}
                </span>
                {context.user?.role && (
                    <span className='text-xs text-primary'>
                        {roleNames[context.user?.role]}
                    </span>
                )}
            </div>
        </div>
    )
}

function Loading() {
    return (
        <div className='flex items-center space-x-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
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
