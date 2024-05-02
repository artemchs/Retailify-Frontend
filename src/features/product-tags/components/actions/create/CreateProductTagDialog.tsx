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
import CreateProductTagForm from './CreateProductTagForm'
import { ProductTag } from '@/types/entities/ProductTag'

export type CreateProductTagDialogProps = {
  selectedValues?: ProductTag[]
  setSelectedValues?: (newValues: ProductTag[]) => void
}

export default function CreateProductTagDialog({
  selectedValues,
  setSelectedValues,
}: CreateProductTagDialogProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить тег
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить тег</DialogTitle>
        </DialogHeader>
        <CreateProductTagForm
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setIsOpened={setIsOpened}
        />
      </DialogContent>
    </Dialog>
  )
}
