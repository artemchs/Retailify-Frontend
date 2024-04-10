import InventoryTransfers from '@/api/services/InventoryTransfers'
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
import { ArchiveRestore, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RestoreInventoryTransferAlertDialog({
  id,
}: {
  id: string
}) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    setIsOpened(false)
    toast('Накладная перемещения была успешно восстановлена.', {
      icon: <ArchiveRestore className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = InventoryTransfers.useRestore({
    setErrorMessage,
    onSuccess,
    id,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger asChild>
        <Button size='icon' variant='secondary'>
          <ArchiveRestore className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Восстановить накладную перемещения товара
          </AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о накладной перемещения товара
            будет восстановлена.
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
                <ArchiveRestore className='h-4 w-4 mr-2' />
              )}
              Восстановить накладную перемещения
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
