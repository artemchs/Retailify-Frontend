import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Edit } from 'lucide-react'
import PointsOfSale from '@/api/services/PointsOfSale'
import EditPosForm from './EditPosForm'

export default function EditPosDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = PointsOfSale.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать точку продаж товара</DialogTitle>
        </DialogHeader>
        <EditPosForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          data={data}
        />
      </DialogContent>
    </Dialog>
  )
}
