import CashierShifts from '@/api/services/CashierShifts'
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
import { BanIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CloseCashierShiftAlertDialog({
  id,
  posId,
  trigger,
  isCloseCashierShiftDialogOpened,
  setIsCloseCashierShiftDialogOpened,
}: {
  id: string
  posId: string
  trigger?: ReactNode
  isCloseCashierShiftDialogOpened?: boolean
  setIsCloseCashierShiftDialogOpened?: React.Dispatch<
    React.SetStateAction<boolean>
  >
}) {
  const [isOpened, setIsOpened] = useState(false)

  function onSuccess() {
    if (setIsCloseCashierShiftDialogOpened) {
      setIsCloseCashierShiftDialogOpened(false)
    } else {
      setIsOpened(false)
    }
    toast('Смена кассира была успешно закрыта.', {
      icon: <BanIcon className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = CashierShifts.useClose({
    setErrorMessage,
    onSuccess,
    id,
    posId,
  })

  return (
    <AlertDialog
      open={isCloseCashierShiftDialogOpened ?? isOpened}
      onOpenChange={() => {
        if (setIsCloseCashierShiftDialogOpened) {
          setIsCloseCashierShiftDialogOpened(false)
        } else {
          setIsOpened(false)
        }
      }}
    >
      {trigger}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Закрыть смену кассира</AlertDialogTitle>
          <AlertDialogDescription>
            Подтверждая это действие, смена кассира будет закрыта.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <AlertDialogFooter
          cancelAction={() => {
            if (setIsCloseCashierShiftDialogOpened) {
              setIsCloseCashierShiftDialogOpened(false)
            } else {
              setIsOpened(false)
            }
          }}
          submitButtonVariant='secondary'
          submitButtonChildren={
            <>
              {isPending ? (
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              ) : (
                <BanIcon className='h-4 w-4 mr-2' />
              )}
              Закрыть смену кассира
            </>
          }
          isPending={isPending}
          submitAction={() => mutate()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
