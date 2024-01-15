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
import CreateWarehouseForm from './CreateWarehouseForm'

export default function CreateWarehouseDialog() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Добавить склад
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить склад</DialogTitle>
        </DialogHeader>
        <CreateWarehouseForm setIsOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  )
}
