import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ReactNode } from '@tanstack/react-router'
import DepositCashierShiftForm from './DepositCashierShiftForm'

export default function DepositCashierShiftDialog({
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
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Внесение средств в кассу</DialogTitle>
        </DialogHeader>
        <DepositCashierShiftForm
          posId={posId}
          setIsOpened={setIsOpenedCustom ?? setIsOpened}
          shiftId={shiftId}
        />
      </DialogContent>
    </Dialog>
  )
}
