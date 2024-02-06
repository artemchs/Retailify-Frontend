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
import Characteristics from '@/api/services/Characteristics'
import CategoryGroups from '@/api/services/CategoryGroups'
import EditCategoryGroupForm from './EditCategoryGroupForm'

export default function EditCategoryGroupDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = CategoryGroups.useFindOne({ id })
  const characteristics = Characteristics.useFindAllForCategory({
    categoryGroupId: id,
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
          <DialogTitle>Редактировать группу категорий</DialogTitle>
        </DialogHeader>
        <EditCategoryGroupForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          categoryGroup={data}
          characteristics={characteristics}
        />
      </DialogContent>
    </Dialog>
  )
}
