import Collections from '@/api/services/Collections'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import EditCollectionForm from './EditCollectionForm'
import Characteristics from '@/api/services/Characteristics'

export default function EditCollectionDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Collections.useFindOne({ id })
  const characteristics = Characteristics.useFindAllForCollection({
    collectionId: id,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm'>
          <Edit className='h-4 w-4 mr-2' />
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать коллекцию</DialogTitle>
          <EditCollectionForm
            id={id}
            collection={data}
            isLoading={isLoading}
            isError={isError}
            setIsOpened={setIsOpened}
            characteristics={characteristics}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
