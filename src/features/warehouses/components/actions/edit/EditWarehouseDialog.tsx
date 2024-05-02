import Warehouses from '@/api/services/Warehouses'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditWarehouseForm from './EditWarehouseForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditWarehouseDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Warehouses.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent className='max-h-[90%] overflow-y-auto'>
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
