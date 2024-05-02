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
import CreateCategoryForm from './CreateCategoryForm'

export type CreateCategoryDialogProps = {
  selectedValue?: string
  setSelectedValue?: (newValue: string) => void
}

export default function CreateCategoryDialog({
  selectedValue,
  setSelectedValue,
}: CreateCategoryDialogProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить категорию
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setIsOpened={setIsOpened}
        />
      </DialogContent>
    </Dialog>
  )
}
