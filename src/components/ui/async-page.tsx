import { Loader2, XCircle } from 'lucide-react'

export function LoadingPage() {
  return (
    <div className='h-full w-full flex items-center justify-center text-muted-foreground'>
      <div className='flex items-center gap-2'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span>Загрузка...</span>
      </div>
    </div>
  )
}

export function ErrorPage() {
  return (
    <div className='h-full w-full flex items-center justify-center text-destructive'>
      <div className='flex items-center gap-2'>
        <XCircle className='h-4 w-4' />
        <span>Произошла ошибка</span>
      </div>
    </div>
  )
}
