import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useState } from 'react'
import Products from '@/api/services/Products'
import EditProductVariantForm from './EditProductVariantForm'
import EditButton from '@/components/data-tables/EditButton'

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
      <EditButton />
      <DialogContent className='max-h-[90%] overflow-y-auto'>
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
