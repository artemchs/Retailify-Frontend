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
import CreateColorForm from './CreateColorForm'
import { ColorsComboboxColor } from '../../shared/ColorsCombobox'

export type CreateColorDialogProps = {
  selectedValues?: ColorsComboboxColor[]
  setSelectedValues?: (newValues: ColorsComboboxColor[]) => void
}

export default function CreateColorDialog({
  selectedValues,
  setSelectedValues,
}: CreateColorDialogProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить цвет
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить цвет</DialogTitle>
        </DialogHeader>
        <CreateColorForm
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setIsOpened={setIsOpened}
        />
      </DialogContent>
    </Dialog>
  )
}
