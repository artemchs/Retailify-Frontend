import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import VariantAdditionalAttributes from '@/api/services/VariantAdditionalAttributes'
import EditVariantAdditionalAttributeForm from './EditVariantAdditionalAttributeForm'

export default function EditVariantAdditionalAttributeDialog({
  id,
}: {
  id: string
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = VariantAdditionalAttributes().useFindOne(
    {
      id,
    }
  )

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            Редактировать дополнительный атрибут варианта
          </DialogTitle>
        </DialogHeader>
        <EditVariantAdditionalAttributeForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data ?? undefined}
        />
      </DialogContent>
    </Dialog>
  )
}
