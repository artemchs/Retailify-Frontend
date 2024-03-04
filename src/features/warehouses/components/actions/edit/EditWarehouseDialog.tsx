import Warehouses from '@/api/services/Warehouses'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import EditWarehouseForm from './EditWarehouseForm'

export default function EditWarehouseDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Warehouses.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать склад</DialogTitle>
        </DialogHeader>
        <EditWarehouseForm
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          warehouseId={id}
          warehouse={data}
        />
      </DialogContent>
    </Dialog>
  )
}
