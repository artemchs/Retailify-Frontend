import Brands from '@/api/services/Brands'
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
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RemoveBrandAlertDialog({
  id,
  setSelectedValue,
  selectedValue,
}: {
  id: string
  selectedValue?: string
  setSelectedValue?: (id?: string) => void
}) {
  const [isOpened, setIsOpened] = useState(false)

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Бренд был успешно удален.', {
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
  const { mutate, isPending } = Brands.useRemove({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger asChild>
        <button className='text-destructive'>
          <Trash2 className='h-4 w-4' />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить бренд</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о бренде будет полностью
            удалена и вы больше не сможете ее восстановить.
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
              Удалить бренд
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
