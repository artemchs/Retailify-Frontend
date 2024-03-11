import Customers from '@/api/services/Customers'
import { AlertDestructive } from '@/components/AlertDestructive'
import AlertDialogFooter from '@/components/dialogs/AlertDialogFooter'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ReactNode } from '@tanstack/react-router'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RemoveCustomerAlertDialog({
  id,
  setSelectedValue,
  selectedValue,
  trigger,
}: {
  id: string
  selectedValue?: string
  setSelectedValue?: (id?: string) => void
  trigger: ReactNode
}) {
  const [isOpened, setIsOpened] = useState(false)

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Клиент был успешно удален.', {
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
    if (selectedValue === id && setSelectedValue) {
      setSelectedValue()
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Customers.useRemove({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      {trigger}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить клиента</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о клиенте будет полностью
            удалена и вы больше{' '}
            <span className='font-medium'>не сможете ее восстановить</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <AlertDialogFooter
          cancelAction={() => setIsOpened(false)}
          submitButtonVariant='destructive'
          submitButtonChildren={
            <>
              {isPending ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                <Trash2 className='h-4 w-4 mr-2' />
              )}
              Удалить клиента
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
