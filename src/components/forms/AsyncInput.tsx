import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { XOctagon } from 'lucide-react'

type Props = {
  input: React.ReactNode
  isLoading: boolean
  isError: boolean
}

export default function AsyncInput({ input, isLoading, isError }: Props) {
  if (isLoading) {
    return <Skeleton className='flex h-9 w-full rounded-md shadow-sm' />
  }

  if (isError) {
    return (
      <div className='flex h-9 w-full rounded-md border border-destructive text-destructive gap-2 items-center bg-transparent px-3 py-1 text-sm shadow-sm'>
        <XOctagon className='h-4 w-4' />
        Произошла ошибка
      </div>
    )
  }

  return input
}
