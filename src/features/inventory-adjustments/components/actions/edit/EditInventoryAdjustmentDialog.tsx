import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditInventoryAdjustmentForm from './EditInventoryAdjustmentForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditInventoryAdjustmentDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryAdjustments.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Редактировать накладную инвентаризации товара
          </DialogTitle>
        </DialogHeader>
        <EditInventoryAdjustmentForm
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data}
          id={id}
        />
      </DialogContent>
    </Dialog>
  )
}
