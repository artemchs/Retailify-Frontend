import Suppliers from '@/api/services/Suppliers'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditSupplierForm from './EditSupplierForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditSupplierDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Suppliers.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать поставщика</DialogTitle>
        </DialogHeader>
        <EditSupplierForm
          supplier={data}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          supplierId={id}
        />
      </DialogContent>
    </Dialog>
  )
}
