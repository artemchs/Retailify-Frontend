import Customers from '@/api/services/Customers'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import EditCustomerForm from './EditCustomerForm'
import { ReactNode } from '@tanstack/react-router'

export default function EditCustomerDialog({
  id,
  trigger,
}: {
  id: string
  trigger: ReactNode
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Customers.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      {trigger}
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать клиента</DialogTitle>
        </DialogHeader>
        <EditCustomerForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data ?? undefined}
        />
      </DialogContent>
    </Dialog>
  )
}
