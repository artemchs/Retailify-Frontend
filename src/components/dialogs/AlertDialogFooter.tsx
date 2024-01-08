import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
  cancelAction: () => void
  submitButtonChildren: React.ReactNode
  submitButtonVariant:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
  submitAction: () => void
  isPending: boolean
}

export default function AlertDialogFooter({
  cancelAction,
  submitButtonChildren,
  submitButtonVariant,
  submitAction,
  isPending,
}: Props) {
  return (
    <div className='mt-2 flex flex-col-reverse gap-2 lg:flex-row lg:justify-end'>
      <Button variant='outline' onClick={cancelAction}>
        Закрыть
      </Button>
      <Button
        variant={submitButtonVariant}
        onClick={submitAction}
        disabled={isPending}
      >
        {submitButtonChildren}
      </Button>
    </div>
  )
}
