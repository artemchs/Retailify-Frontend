import ProductTags from '@/api/services/ProductTags'
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
import { CreateVariantAdditionalAttributeDialog } from '../create/CreateVariantAdditionalAttributeDialog'

export default function RemoveVariantAdditionalAttributeAlertDialog({
  id,
  selectedValue,
  setSelectedValue,
}: { id: string } & CreateVariantAdditionalAttributeDialog) {
  const [isOpened, setIsOpened] = useState(false)

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Атрибут варианта был успешно удален.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (selectedValue && setSelectedValue && selectedValue === id) {
      setSelectedValue('')
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = ProductTags.useRemove({
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
          <AlertDialogTitle>
            Удалить дополнительный атрибут варианта
          </AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация об атрибуте варианта будет
            полностью удалена и вы больше не сможете ее восстановить.
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
              Удалить атрибут
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
