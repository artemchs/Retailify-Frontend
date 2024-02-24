import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import EditInventoryAdjustmentReasonForm from './EditInventoryAdjustmentReasonForm'

export default function EditInventoryAdjustmentReasonDialog({
  id,
}: {
  id: string
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryAdjustments.useFindOneReason({
    id,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать причину инвентаризации товара</DialogTitle>
        </DialogHeader>
        <EditInventoryAdjustmentReasonForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          reason={data}
        />
      </DialogContent>
    </Dialog>
  )
}
