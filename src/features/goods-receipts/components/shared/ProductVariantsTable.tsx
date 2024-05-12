import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FormInput, X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CurrencyFormatter } from '@/components/ui/units'
import { GoodsReceiptVariant } from '@/features/goods-receipts/types/create-goods-receipt-form-schema.ts'
import { DisplayUploadedFile } from '@/features/products/components/shared/form/media/DisplayUploadedFile'

type Props = {
  variants: GoodsReceiptVariant[]
  setVariants: (newVariants: GoodsReceiptVariant[]) => void
}

export default function ProductVariantsTable({ variants, setVariants }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='border rounded-md border-input'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Модель</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead className='text-right'>
                Полученное количество (шт)
              </TableHead>
              <TableHead className='text-right'>Цена закупки (грн)</TableHead>
              <TableHead className='text-right'>Цена продажи (грн)</TableHead>
              <TableHead className='text-right'>Общая стоимость</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants?.map((variant) => (
              <TableRow key={variant.variantId}>
                <TableCell>
                  <div className='flex gap-4 items-center min-w-80'>
                    {variant.productImgId && (
                      <div className='w-14 h-14 shrink-0'>
                        <DisplayUploadedFile
                          id={variant.productImgId}
                          className='w-full aspect-square shadow-sm'
                        />
                      </div>
                    )}
                    <span className='font-medium'>{variant.productName}</span>
                  </div>
                </TableCell>
                <TableCell>{variant.size}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <CustomNumberInput
                      currVariant={variant}
                      field='receivedQuantity'
                      setVariants={setVariants}
                      variants={variants}
                    />
                    <AutocompleteButton
                      currVariant={variant}
                      field='receivedQuantity'
                      setVariants={setVariants}
                      variants={variants}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <CustomNumberInput
                      currVariant={variant}
                      field='supplierPrice'
                      setVariants={setVariants}
                      variants={variants}
                    />
                    <AutocompleteButton
                      currVariant={variant}
                      field='supplierPrice'
                      setVariants={setVariants}
                      variants={variants}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <CustomNumberInput
                      currVariant={variant}
                      field='sellingPrice'
                      setVariants={setVariants}
                      variants={variants}
                    />
                    <AutocompleteButton
                      currVariant={variant}
                      field='sellingPrice'
                      setVariants={setVariants}
                      variants={variants}
                    />
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <CurrencyFormatter
                    value={
                      variant.receivedQuantity && variant.supplierPrice
                        ? variant.receivedQuantity * variant.supplierPrice
                        : 0
                    }
                    className='font-medium'
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-8 w-8'
                    onClick={() => {
                      const newArray = variants.filter(
                        (obj) => obj.variantId !== variant.variantId
                      )
                      setVariants(newArray)
                    }}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {variants.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className='w-full flex items-center justify-center h-24'>
                    <p>Вы еще не выбрали товары...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function AutocompleteButton({
  setVariants,
  variants,
  field,
  currVariant,
}: Props & {
  field: keyof GoodsReceiptVariant
  currVariant: GoodsReceiptVariant
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            className='shrink-0'
            variant='ghost'
            type='button'
            onClick={() => {
              const newVariants = variants.map((v) => ({
                ...v,
                [field]:
                  v.productId === currVariant.productId
                    ? currVariant[field]
                    : v[field],
              }))
              setVariants(newVariants)
            }}
          >
            <FormInput className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Использовать для всех товаров модели.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function CustomNumberInput({
  setVariants,
  variants,
  field,
  currVariant,
}: Props & {
  field: keyof GoodsReceiptVariant
  currVariant: GoodsReceiptVariant
}) {
  return (
    <Input
      value={currVariant[field]}
      type='number'
      className='min-w-36'
      onChange={(e) => {
        const newVariants = variants
        const index = newVariants.findIndex(
          (obj) => obj.variantId === currVariant.variantId
        )
        newVariants[index] = {
          ...newVariants[index],
          [field]: e.target.valueAsNumber,
        }
        setVariants(newVariants)
      }}
    />
  )
}
