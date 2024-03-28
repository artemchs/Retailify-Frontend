import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import CashierRefundsList from './CashierRefundsList'

type Props = {
  trigger?: ReactNode
  setIsOpenedCustom: React.Dispatch<React.SetStateAction<boolean>>
  isOpenedCustom: boolean
}

export default function CashierRefundsDialog({
  trigger,
  isOpenedCustom,
  setIsOpenedCustom,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog
      open={isOpenedCustom ?? isOpened}
      onOpenChange={setIsOpenedCustom ?? setIsOpened}
    >
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Возвраты</DialogTitle>
        </DialogHeader>
        <CashierRefundsList />
      </DialogContent>
    </Dialog>
  )
}
