import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import CreateInventoryTransferForm from './CreateInventoryTransferForm'

export default function CreateInventoryTransferDialog() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить накладную инвентаризации товара</DialogTitle>
        </DialogHeader>
        <CreateInventoryTransferForm setIsOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  )
}
