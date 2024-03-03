import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Edit } from 'lucide-react'
import InventoryTransfers from '@/api/services/InventoryTransfers'
import EditInventoryTransferForm from './EditInventoryTransferForm'

export default function EditInventoryTransferDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryTransfers.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
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
