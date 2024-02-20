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
import RestoreVariantAlertDialog from './RestoreVariantAlertDialog'
import ArchiveVariantAlertDialog from './ArchiveVariantAlertDialog'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
  productId?: string
}

export default function VariantsInput({ field, form, productId }: Props) {
  const variants = field.value as ProductVariantsSchema
  function setVariants(newVariants: ProductVariantsSchema) {
    form.setValue('variants', newVariants)
  }

  const [displayArchived, setDisplayArchived] = useState(false)

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
            {variants?.map(
              (v, i) =>
                v.isArchived === displayArchived && (
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
                        productId && v.isArchived ? (
                          <RestoreVariantAlertDialog
                            id={v.id}
                            productId={productId}
                            callback={() => {
                              const newVariants = variants
                              newVariants[i].isArchived = false
                              setVariants(newVariants)
                            }}
                          />
                        ) : (
                          productId && (
                            <ArchiveVariantAlertDialog
                              id={v.id}
                              productId={productId}
                              callback={() => {
                                const newVariants = variants
                                newVariants[i].isArchived = true
                                setVariants(newVariants)
                              }}
                            />
                          )
                        )
                      ) : (
                        <Button
                          size='icon'
                          className='h-8 w-8'
                          variant='secondary'
                          type='button'
                          onClick={() => {
                            const newArray = variants
                            newArray.splice(i)
                            setVariants(newArray)
                          }}
                        >
                          <Minus className='h-4 w-4' />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
            )}
            {variants?.filter(
              ({ isArchived }) => isArchived === displayArchived
            )?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className='h-24 flex items-center justify-center text-muted-foreground'>
                    Тут ничего нет...
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <Button variant='secondary' type='button' onClick={addNewVariant}>
          <Plus className='h-4 w-4 mr-2' />
          Добавить размер
        </Button>
        <div className='flex items-center gap-2'>
          <Label htmlFor='archived-variants'>Архив</Label>
          <Switch
            onClick={() => setDisplayArchived(!displayArchived)}
            value={String(displayArchived)}
            id='archived-variants'
          />
        </div>
      </div>
    </div>
  )
}
