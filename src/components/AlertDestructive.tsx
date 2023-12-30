import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AlertDestructive({ text }: { text: string }) {
  return (
    <Alert variant='destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertTitle>Произоша ошибка</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}
