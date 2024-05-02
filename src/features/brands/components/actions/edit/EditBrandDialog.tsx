import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import Brands from '@/api/services/Brands'
import EditBrandForm from './EditBrandForm'

export default function EditBrandDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Brands.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать бренд</DialogTitle>
        </DialogHeader>
        <EditBrandForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          brand={data ?? undefined}
          setIsOpened={setIsOpened}
        />
      </DialogContent>
    </Dialog>
  )
}
