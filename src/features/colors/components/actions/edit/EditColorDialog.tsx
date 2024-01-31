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

export default function EditColorDialog({
  id,
  onSuccess,
}: {
  id: string
  onSuccess?: (id: string) => void
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Colors.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать цвет</DialogTitle>
        </DialogHeader>
        <EditColorForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          color={data}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
