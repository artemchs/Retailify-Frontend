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
import CreateCharacteristicForm from './CreateCharacteristicForm'
import { Characteristic } from '@/types/entities/Characteristic'

type Props = {
  selectedValues?: Characteristic[]
  setSelectedValues?: (newValues: Characteristic[]) => void
}

export default function CreateCharacteristicDialog({
  selectedValues,
  setSelectedValues,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить характеристику
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить характеристику</DialogTitle>
        </DialogHeader>
        <CreateCharacteristicForm
          setIsOpened={setIsOpened}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
