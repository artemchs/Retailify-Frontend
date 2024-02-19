import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ProductVariantsSchema } from '@/features/products/types/create-product-form-schema'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
}

export default function VariantsInput({ field, form }: Props) {
  const variants = field.value as ProductVariantsSchema
  function setVariants(newVariants: ProductVariantsSchema) {
    form.setValue('variants', newVariants)
  }

  const addNewVariant = () => {
    setVariants([
      ...(variants ?? []),
      {
        isArchived: false,
        price: 0,
        size: '',
      },
    ])
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='border border-input rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Размер</TableHead>
              <TableHead>Цена продажи</TableHead>
              <TableHead>Скидка</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants?.map((v, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    value={v.size}
                    onChange={(e) => {
                      const newArray = variants
                      newArray[i].size = e.target.value
                      setVariants(newArray)
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={v.price}
                    onChange={(e) => {
                      const newArray = variants
                      newArray[i].price = parseFloat(e.target.value)
                      setVariants(newArray)
                    }}
                    type='number'
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={v.sale}
                    onKeyDown={(e) => {
                      if (e.code === 'Enter' && i === variants.length - 1) {
                        addNewVariant()
                      }
                    }}
                    onChange={(e) => {
                      const newArray = variants
                      newArray[i].sale = parseFloat(e.target.value)
                      setVariants(newArray)
                    }}
                    type='number'
                  />
                </TableCell>
                <TableCell>
                  {v.id ? (
                    <></>
                  ) : (
                    <Button
                      size='icon'
                      className='h-8 w-8'
                      variant='secondary'
                      type='button'
                      onClick={() => setVariants(variants.splice(i, 1))}
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {variants?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className='h-24 flex items-center justify-center text-muted-foreground'>
                    Вы пока-что еще не добавили варианты товара...
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        size='icon'
        variant='secondary'
        type='button'
        onClick={addNewVariant}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  )
}
