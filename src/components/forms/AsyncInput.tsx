import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { XOctagon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  input: React.ReactNode
  isLoading: boolean
  isError: boolean
  heightClassName?: string
}

export default function AsyncInput({
  input,
  isLoading,
  isError,
  heightClassName,
}: Props) {
  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          'flex w-full rounded-md shadow-sm',
          heightClassName ?? 'h-9'
        )}
      />
    )
  }

  if (isError) {
    return (
      <div
        className={cn(
          'flex w-full rounded-md border border-destructive text-destructive gap-2 items-center bg-transparent px-3 py-1 text-sm shadow-sm',
          heightClassName ?? 'h-9'
        )}
      >
        <XOctagon className='h-4 w-4' />
        Произошла ошибка
      </div>
    )
  }

  return input
}
