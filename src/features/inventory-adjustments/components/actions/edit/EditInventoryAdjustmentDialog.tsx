import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditInventoryAdjustmentForm from './EditInventoryAdjustmentForm'
import { Edit } from 'lucide-react'

export default function EditInventoryAdjustmentDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = InventoryAdjustments.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
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
