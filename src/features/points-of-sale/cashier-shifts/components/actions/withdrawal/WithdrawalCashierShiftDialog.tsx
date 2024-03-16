import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ReactNode } from '@tanstack/react-router'
import WithdrawalCashierShiftForm from './WithdrawalCashierShiftForm'

export default function WithdrawalCashierShiftDialog({
  posId,
  trigger,
  isOpenedCustom,
  setIsOpenedCustom,
  shiftId,
}: {
  posId: string
  trigger?: ReactNode
  isOpenedCustom?: boolean
  setIsOpenedCustom?: React.Dispatch<React.SetStateAction<boolean>>
  shiftId: string
}) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog
      open={isOpenedCustom ?? isOpened}
      onOpenChange={setIsOpenedCustom ?? setIsOpened}
    >
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изъятие средств из кассы</DialogTitle>
        </DialogHeader>
        <WithdrawalCashierShiftForm
          posId={posId}
          setIsOpened={setIsOpenedCustom ?? setIsOpened}
          shiftId={shiftId}
        />
      </DialogContent>
    </Dialog>
  )
}
