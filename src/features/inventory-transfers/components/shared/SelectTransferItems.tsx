import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import { InventoryTransferItem } from '../../types/create-inventory-transfer-form-schema'
import { useEffect, useState } from 'react'
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
import SelectVariantsDialog from '@/features/products/variants/components/shared/selectVariants/SelectVariantsDialog'
import { RowSelectionState } from '@tanstack/react-table'
import { Variant } from '@/types/entities/Variant'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'transferItems'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
}

export default function SelectTransferItems({ control, field, form }: Props) {
  const items = field.value as InventoryTransferItem[]
  function setItems(newItems: InventoryTransferItem[]) {
    form.setValue('transferItems', newItems)
  }

  const sourceWarehouseId = useWatch({
    control,
    name: 'sourceWarehouseId',
  })

  useEffect(() => {
    if (sourceWarehouseId) {
      form.setValue('transferItems', [])
    }
  }, [sourceWarehouseId, form])

  if (!sourceWarehouseId)
    return (
      <p className='text-muted-foreground'>
        Что-бы заполнить товар, сначала выберите исходный склад.
      </p>
    )

  return (
    <SelectItemsCommand
      items={items}
      setItems={setItems}
      sourceWarehouseId={sourceWarehouseId}
    />
  )
}

function SelectItemsCommand({
  items,
  setItems,
  sourceWarehouseId,
}: {
  setItems(newItems: InventoryTransferItem[]): void
  items: InventoryTransferItem[]
  sourceWarehouseId: string
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    items.reduce((obj, item) => {
      obj[item.id.toString()] = true
      return obj
    }, {} as { [key: string]: boolean })
  )

  return (
    <div className='flex flex-col gap-2'>
      <SelectVariantsDialog
        selectedRows={rowSelection}
        setSelectedRows={setRowSelection}
        setSelectedValues={(newValues) =>
          setItems(
            newValues.map(({ warehouseStockEntries, id, size, product }) => {
              const existingObj = items.find((obj) => obj.id === id)

              return {
                quantity: existingObj?.quantity ?? 0,
                id,
                size,
                title: product?.title ?? '',
                warehouseQuantity:
                  existingObj?.warehouseQuantity ??
                  warehouseStockEntries?.find(
                    (obj) => obj.warehouseId === sourceWarehouseId
                  )?.warehouseQuantity,
              }
            })
          )
        }
        selectedValues={items as unknown as Variant[]}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead className='text-right'>Кол-во</TableHead>
            <TableHead className='text-right'>Переместить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableItem
              key={item.id}
              i={i}
              item={item}
              items={items}
              setItems={setItems}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TableItem({
  item,
  setItems,
  items,
  i,
}: {
  item: InventoryTransferItem
  setItems(newItems: InventoryTransferItem[]): void
  items: InventoryTransferItem[]
  i: number
}) {
  return (
    <TableRow>
      <TableCell className='flex flex-col gap-1'>
        <span>{item.title}</span>
        <Badge variant='secondary' className='w-fit'>
          {item.size}
        </Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-end'>
          {item.warehouseQuantity}
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-end'>
          <Input
            className='w-24'
            type='number'
            value={item.quantity}
            onChange={(e) => {
              const newVal = parseInt(e.target.value)
              const newItems = [...items]
              newItems[i] = { ...items[i], quantity: newVal }
              setItems(newItems)
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
