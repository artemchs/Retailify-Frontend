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
import CreateCharacteristicValueForm from './CreateCharacteristicValueForm'
import { CharacteristicValue } from '@/types/entities/Characteristic'

type Props = {
  characteristicId: string
  selectedValues: CharacteristicValue[]
  setSelectedValues: (newValues?: CharacteristicValue[]) => void
}

export default function CreateCharacteristicValueDialog({
  characteristicId,
  selectedValues,
  setSelectedValues,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='w-full'>
          <Plus className='h-4 w-4 mr-2' />
          Добавить значение
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить значение к характеристике</DialogTitle>
        </DialogHeader>
        <CreateCharacteristicValueForm
          characteristicId={characteristicId}
          setIsOpened={setIsOpened}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
