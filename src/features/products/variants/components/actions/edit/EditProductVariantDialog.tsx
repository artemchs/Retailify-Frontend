import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import Products from '@/api/services/Products'
import EditProductVariantForm from './EditProductVariantForm'
import { Button } from '@/components/ui/button'

export default function EditProductVariantDialog({
  id,
  productId,
}: {
  id: string
  productId: string
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Products.useFindOneVariant({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать вариант товара</DialogTitle>
        </DialogHeader>
        <EditProductVariantForm
          id={id}
          isError={isError}
          isLoading={isLoading}
          productId={productId}
          setIsOpened={setIsOpened}
          data={data}
        />
      </DialogContent>
    </Dialog>
  )
}
