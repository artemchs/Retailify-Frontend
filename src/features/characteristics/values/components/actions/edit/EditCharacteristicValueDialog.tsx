import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import Characteristics from '@/api/services/Characteristics'
import EditCharacteristicValueForm from './EditCharacteristicValueForm'

export default function EditCharacteristicValueDialog({
  id,
  characteristicId,
}: {
  id: string
  characteristicId: string
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Characteristics.useFindOneValue({
    id,
    characteristicId,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать значение характеристики</DialogTitle>
        </DialogHeader>
        <EditCharacteristicValueForm
          characteristicId={characteristicId}
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          value={data ?? undefined}
        />
      </DialogContent>
    </Dialog>
  )
}
