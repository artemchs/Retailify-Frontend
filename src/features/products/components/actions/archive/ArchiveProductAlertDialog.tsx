import Products from '@/api/services/Products'
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
import { Archive, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ArchiveProductAlertDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    setIsOpened(false)
    toast('Модель товара была успешно архивирована.', {
      icon: <Archive className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useArchive({
    setErrorMessage,
    onSuccess,
    id,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='secondary'>
          <Archive className='h-4 w-4 mr-2' />
          Архивировать
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Архивировать модель товара</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о моделе товара будет
            архивирована.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <AlertDialogFooter
          cancelAction={() => setIsOpened(false)}
          submitButtonVariant='secondary'
          submitButtonChildren={
            <>
              {isPending ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                <Archive className='h-4 w-4 mr-2' />
              )}
              Архивировать модель товара
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
