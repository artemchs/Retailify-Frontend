import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import ProductTags from '@/api/services/ProductTags'
import EditProductTagForm from './EditProductTagForm'
import { CreateProductTagDialogProps } from '../create/CreateProductTagDialog'

export default function EditProductTagDialog({
  id,
  selectedValues,
  setSelectedValues,
}: {
  id: string
} & CreateProductTagDialogProps) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = ProductTags.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать тег</DialogTitle>
        </DialogHeader>
        <EditProductTagForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data ?? undefined}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
