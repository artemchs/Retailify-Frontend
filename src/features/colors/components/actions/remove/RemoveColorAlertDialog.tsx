import Colors from '@/api/services/Colors'
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
import { CreateColorDialogProps } from '../create/CreateColorDialog'

export default function DeleteColorAlertDialog({
  id,
  selectedValues,
  setSelectedValues,
}: { id: string } & CreateColorDialogProps) {
  const [isOpened, setIsOpened] = useState(false)

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Цвет был успешно удален.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (selectedValues && setSelectedValues && selectedValues.length >= 1) {
      const isSelected = selectedValues.find((obj) => obj.id === id)
      if (isSelected) {
        setSelectedValues(selectedValues.filter((obj) => obj.id !== id))
      }
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Colors.useRemove({
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
          <AlertDialogTitle>Удалить цвет</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о цвете будет полностью удалена
            и вы больше не сможете ее восстановить.
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
              Удалить цвет
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
