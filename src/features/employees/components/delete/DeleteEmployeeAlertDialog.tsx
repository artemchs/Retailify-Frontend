import Employees from '@/api/services/Employees'
import { AlertDestructive } from '@/components/AlertDestructive'
import AlertDialogFooter from '@/components/dialogs/AlertDialogFooter'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DeleteEmployeeAlertDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['employee', { id }],
    })
    queryClient.invalidateQueries({
      queryKey: ['employees'],
    })
    setIsOpened(false)
    toast('Сотрудник был успешно удален.', {
      icon: <Trash2 className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Employees.useDelete({
    setErrorMessage,
    onSuccess,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='destructive'>
          <Trash2 className='h-4 w-4 mr-2' />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить сотрудника</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие можно отменить. При удалении сотрудника ему будет
            присвоен статус "удален". Если вам нужно восстановить этого
            сотрудника, вы можете перейти на страницу корзины.
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
              Удалить сотрудника
            </>
          }
          isPending={isPending}
          submitAction={() => mutate({ id })}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
