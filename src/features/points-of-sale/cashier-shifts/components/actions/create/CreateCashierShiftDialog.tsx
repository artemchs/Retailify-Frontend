import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import CreateCashierShiftForm from './CreateCashierShiftForm'
import { ReactNode } from '@tanstack/react-router'

export default function CreateCashierShiftDialog({
  posId,
  trigger,
  isCreateCashierShiftDialogOpened,
  setIsCreateCashierShiftDialogOpened,
  setShiftId,
}: {
  posId: string
  trigger?: ReactNode
  isCreateCashierShiftDialogOpened?: boolean
  setIsCreateCashierShiftDialogOpened?: React.Dispatch<
    React.SetStateAction<boolean>
  >
  setShiftId?: (id: string) => void
}) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog
      open={isCreateCashierShiftDialogOpened ?? isOpened}
      onOpenChange={setIsCreateCashierShiftDialogOpened ?? setIsOpened}
    >
      {trigger}
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Открыть смену кассира</DialogTitle>
        </DialogHeader>
        <CreateCashierShiftForm
          setIsOpened={setIsCreateCashierShiftDialogOpened ?? setIsOpened}
          posId={posId}
          setShiftId={setShiftId}
        />
      </DialogContent>
    </Dialog>
  )
}
