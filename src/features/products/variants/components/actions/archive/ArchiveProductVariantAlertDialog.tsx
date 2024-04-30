import Products from '@/api/services/Products'
import { AlertDestructive } from '@/components/AlertDestructive'
import ArchiveButton from '@/components/data-tables/ArchiveButton'
import AlertDialogFooter from '@/components/dialogs/AlertDialogFooter'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Archive, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ArchiveProductVariantAlertDialog({
  id,
  productId,
}: {
  id: string
  productId: string
}) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    setIsOpened(false)
    toast('Вариант товара был успешно архивирован.', {
      icon: <Archive className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useArchiveVariant({
    setErrorMessage,
    onSuccess,
    id,
    productId,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <ArchiveButton />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Архивировать вариант товара</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о варианте товара будет
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
              Архивировать вариант товара
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
