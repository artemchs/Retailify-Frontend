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
import CreateCategoryGroupForm from './CreateCategoryGroupForm'

export default function CreateCategoryGroupDialog() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Добавить группу категорий
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить группу категорий</DialogTitle>
        </DialogHeader>
        <CreateCategoryGroupForm setIsOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  )
}
