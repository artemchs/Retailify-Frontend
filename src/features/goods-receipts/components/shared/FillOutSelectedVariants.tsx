import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CurrencyFormatter } from '@/components/ui/units'
import ProductVariantsTable from '@/features/goods-receipts/components/shared/ProductVariantsTable.tsx'
import { GoodsReceiptVariant } from '@/features/goods-receipts/types/create-goods-receipt-form-schema.ts'
import { Save } from 'lucide-react'

type Props = {
  isOpened: boolean
  setIsOpened: (isOpened: boolean) => void
  variants: GoodsReceiptVariant[]
  setVariants: (variants: GoodsReceiptVariant[]) => void
  onSubmit: (variants: GoodsReceiptVariant[]) => void
}

export default function FillOutSelectedVariants({
  isOpened,
  setIsOpened,
  setVariants,
  variants,
  onSubmit,
}: Props) {
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent className='max-w-screen-2xl max-h-[90%] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Заполнить значения для выбранного товара:</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-between w-full'>
          <DisplayTotalForSelectedVariants variants={variants} />
          <Button
            className='w-fit ml-auto'
            type='button'
            onClick={() => onSubmit(variants)}
          >
            <Save className='h-4 w-4 mr-2' />
            Сохранить
          </Button>
        </div>
        <ProductVariantsTable variants={variants} setVariants={setVariants} />
      </DialogContent>
    </Dialog>
  )
}

function DisplayTotalForSelectedVariants({
  variants,
}: {
  variants: GoodsReceiptVariant[]
}) {
  return (
    <div className='flex items-center gap-1 font-medium'>
      <span>Итого:</span>
      <CurrencyFormatter
        value={variants
          .map(({ receivedQuantity, supplierPrice }) =>
            receivedQuantity && supplierPrice
              ? receivedQuantity * supplierPrice
              : 0
          )
          .reduce((prev, curr) => prev + curr, 0)}
      />
    </div>
  )
}
