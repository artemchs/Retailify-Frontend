import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import Colors from '@/api/services/Colors'
import EditColorForm from './EditColorForm'
import { CreateColorDialogProps } from '../create/CreateColorDialog'

export default function EditColorDialog({
  id,
  selectedValues,
  setSelectedValues,
}: {
  id: string
} & CreateColorDialogProps) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Colors.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать цвет</DialogTitle>
        </DialogHeader>
        <EditColorForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          color={data ?? undefined}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
