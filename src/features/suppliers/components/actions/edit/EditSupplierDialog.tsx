import Suppliers from '@/api/services/Suppliers'
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
import EditSupplierForm from './EditSupplierForm'

export default function EditSupplierDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Suppliers.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm'>
          <Edit className='h-4 w-4 mr-2' />
          Редактировать
        </Button>
      </DialogTrigger>
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
