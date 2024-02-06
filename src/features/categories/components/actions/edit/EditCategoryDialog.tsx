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
import Categories from '@/api/services/Categories'
import EditCategoryForm from './EditCategoryForm'

export default function EditCategoryDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Categories.useFindOne({ id })
  const characteristics = Characteristics.useFindAllForCategory({
    categoryId: id,
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
          <DialogTitle>Редактировать категорию</DialogTitle>
        </DialogHeader>
        <EditCategoryForm
          characteristics={characteristics}
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          category={data}
        />
      </DialogContent>
    </Dialog>
  )
}
