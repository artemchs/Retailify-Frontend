import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import EditCharacteristicForm from './EditCharacteristicForm'
import Characteristics from '@/api/services/Characteristics'
import { Characteristic } from '@/types/entities/Characteristic'

export default function EditCharacteristicDialog({
  id,
  selectedValues,
  setSelectedValues,
}: {
  id: string
  selectedValues?: Characteristic[]
  setSelectedValues?: (newValues?: Characteristic[]) => void
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Characteristics.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать характеристику</DialogTitle>
        </DialogHeader>
        <EditCharacteristicForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          characteristic={data ?? undefined}
          setIsOpened={setIsOpened}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
