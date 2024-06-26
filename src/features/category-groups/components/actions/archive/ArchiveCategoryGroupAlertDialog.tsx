import CategoryGroups from '@/api/services/CategoryGroups'
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

export default function ArchiveCategoryGroupAlertDialog({
  id,
}: {
  id: string
}) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    setIsOpened(false)
    toast('Группа категорий была успешно архивирована.', {
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
  const { mutate, isPending } = CategoryGroups.useArchive({
    setErrorMessage,
    onSuccess,
    id,
  })

  return (
    <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
      <ArchiveButton />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Архивировать группу категорий</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, информация о группе категорий будет
            архивирована. Вы сможете потом ее восстановить.
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
              Архивировать группу категорий
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
