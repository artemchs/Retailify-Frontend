import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import InventoryTransfers from '@/api/services/InventoryTransfers'
import EditInventoryTransferReasonForm from './EditInventoryTransferReasonForm'

export default function EditInventoryTransferReasonDialog({
  id,
}: {
  id: string
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryTransfers.useFindOneReason({
    id,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать причину перемещения товара</DialogTitle>
        </DialogHeader>
        <EditInventoryTransferReasonForm
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
