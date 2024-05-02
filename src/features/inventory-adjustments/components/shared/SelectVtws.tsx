import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { InventoryAdjustmentVariant } from '../../types/create-inventory-adjustment-form-schema'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { RowSelectionState } from '@tanstack/react-table'
import SelectVariantsDialog from '@/features/products/variants/components/shared/selectVariants/SelectVariantsDialog'
import { Variant } from '@/types/entities/Variant'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
}

export default function SelectVtws({ field, form, control }: Props) {
  const vtws = field.value as InventoryAdjustmentVariant[]
  function setVtws(newVtws: InventoryAdjustmentVariant[]) {
    form.setValue('variants', newVtws)
  }

  const warehouseId = useWatch({
    control,
    name: 'warehouseId',
  })

  useEffect(() => {
    if (warehouseId) {
      form.setValue('variants', [])
    }
  }, [warehouseId, form])

  if (!warehouseId)
    return (
      <p className='text-muted-foreground'>
        Что-бы заполнить товар, сначала выберите склад.
      </p>
    )

  return (
    <SelectVtwsCommand
      warehouseId={warehouseId}
      setVtws={setVtws}
      vtws={vtws}
    />
  )
}

function SelectVtwsCommand({
  setVtws,
  vtws,
  warehouseId,
}: {
  setVtws(newVtws: InventoryAdjustmentVariant[]): void
  vtws: InventoryAdjustmentVariant[]
  warehouseId: string
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    vtws.reduce((obj, item) => {
      obj[item.variantId.toString()] = true
      return obj
    }, {} as { [key: string]: boolean })
  )

  return (
    <div className='flex flex-col gap-2'>
      <SelectVariantsDialog
        selectedRows={rowSelection}
        setSelectedRows={setRowSelection}
        setSelectedValues={(newValues) =>
          setVtws(
            newValues.map(({ warehouseStockEntries, id, product, size }) => {
              const thisWarehouseStockEntry = warehouseStockEntries?.find(
                (obj) => obj.warehouseId === warehouseId
              )
              const existingObj = vtws.find(
                (obj) =>
                  obj.variantToWarehouseId ===
                  thisWarehouseStockEntry?.warehouseId
              )

              const warehouseStockEntryQuantity =
                thisWarehouseStockEntry?.warehouseQuantity ?? 0
              const wseId = thisWarehouseStockEntry?.id ?? ''

              return {
                newQuantity:
                  existingObj?.newQuantity ?? warehouseStockEntryQuantity,
                oldQuantity:
                  existingObj?.oldQuantity ?? warehouseStockEntryQuantity,
                quantityChange: existingObj?.quantityChange ?? 0,
                variantId: id,
                variantToWarehouseId: wseId,
                productTitle: product?.title,
                size,
              }
            })
          )
        }
        selectedValues={vtws as unknown as Variant[]}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead className='text-right'>Кол-во</TableHead>
            <TableHead className='text-right'>Новое кол-во</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vtws.map((vtw) => (
            <TableVariant vtw={vtw} setVtws={setVtws} vtws={vtws} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TableVariant({
  vtw: { productTitle, size, oldQuantity, quantityChange, variantId },
  setVtws,
  vtws,
}: {
  vtw: InventoryAdjustmentVariant
  vtws: InventoryAdjustmentVariant[]
  setVtws: (newVtws: InventoryAdjustmentVariant[]) => void
}) {
  const [newQuantity, setNewQuantity] = useState<number | undefined>(
    (oldQuantity ?? 0) + quantityChange
  )

  useEffect(() => {
    const index = vtws.findIndex((obj) => obj.variantId === variantId)
    const newVtws = vtws
    newVtws[index] = {
      ...newVtws[index],
      newQuantity: newQuantity ?? oldQuantity,
    }
    setVtws(newVtws)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuantity])

  return (
    <TableRow>
      <TableCell className='flex flex-col gap-1'>
        <span>{productTitle}</span>
        <Badge variant='secondary' className='w-fit'>
          {size}
        </Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-end'>{oldQuantity}</div>
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-end'>
          <Input
            className='w-24'
            type='number'
            value={newQuantity}
            onChange={(e) => {
              const newVal = parseInt(e.target.value)
              setNewQuantity(newVal ?? undefined)
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
