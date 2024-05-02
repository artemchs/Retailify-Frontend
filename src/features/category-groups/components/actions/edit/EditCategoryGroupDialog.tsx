import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import Characteristics from '@/api/services/Characteristics'
import CategoryGroups from '@/api/services/CategoryGroups'
import EditCategoryGroupForm from './EditCategoryGroupForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditCategoryGroupDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = CategoryGroups.useFindOne({ id })
  const characteristics = Characteristics.useFindAllForCategory({
    categoryGroupId: id,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent className='max-h-[90%] overflow-y-auto'>
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
