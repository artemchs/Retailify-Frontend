import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import CreateCustomerForm from './CreateCustomerForm'
import { ReactNode } from '@tanstack/react-router'

export default function CreateCustomerDialog({
  trigger,
}: {
  trigger: ReactNode
}) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить клиента</DialogTitle>
        </DialogHeader>
        <CreateCustomerForm setIsOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  )
}
