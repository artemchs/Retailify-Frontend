import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import PointsOfSale from '@/api/services/PointsOfSale'
import EditPosForm from './EditPosForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditPosDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = PointsOfSale.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать кассу</DialogTitle>
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
