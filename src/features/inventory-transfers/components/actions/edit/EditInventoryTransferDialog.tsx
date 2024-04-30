
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from '@/components/ui/dialog'
import { useState } from 'react'

import InventoryTransfers from '@/api/services/InventoryTransfers'
import EditInventoryTransferForm from './EditInventoryTransferForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditInventoryTransferDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryTransfers.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать накладную перемещения товара</DialogTitle>
        </DialogHeader>
        <EditInventoryTransferForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data}
        />
      </DialogContent>
    </Dialog>
  )
}
