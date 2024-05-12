import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProductVariantsTable from '@/features/goods-receipts/components/shared/ProductVariantsTable.tsx'
import { GoodsReceiptVariant } from '@/features/goods-receipts/types/create-goods-receipt-form-schema.ts'

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
        <ProductVariantsTable
          variants={variants}
          setVariants={setVariants}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
