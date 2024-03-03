import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import { InventoryTransferItem } from '../../types/create-inventory-transfer-form-schema'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import Products from '@/api/services/Products'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import { Button } from '@/components/ui/button'
import { CheckIcon, Search } from 'lucide-react'
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Error, Loading } from '@/components/forms/CrudComboboxMultiple'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

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
  const [searchInputValue, setSearchInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const setQueryValue = useCallback(
    (value: string) => {
      setQuery(value)
    },
    [setQuery]
  )

  const debouncedSetQueryValue = useMemo(() => {
    return debounce(setQueryValue, 300)
  }, [setQueryValue])

  const [observerTarget, setObserverTarget] = useState<HTMLDivElement | null>(
    null
  )

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = Products.useFindAllInfiniteListVariantForWarehouse({
    query,
    warehouseId: sourceWarehouseId,
  })

  useScrollToFetchData(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    observerTarget
  )

  return (
    <div className='flex flex-col gap-2'>
      <Button
        variant='outline'
        role='combobox'
        aria-expanded={isOpened}
        type='button'
        className='w-full justify-between'
        onClick={() => setIsOpened(true)}
      >
        <div className='flex items-center gap-2 text-muted-foreground '>
          <Search className='h-4 w-4' />
          <span className='font-normal'>Поиск товаров...</span>
        </div>
      </Button>
      <CommandDialog
        shouldFilter={false}
        open={isOpened}
        onOpenChange={setIsOpened}
      >
        <CommandInput
          value={searchInputValue}
          onValueChange={(value) => {
            setSearchInputValue(value)
            debouncedSetQueryValue(value)
          }}
          placeholder='Поиск товаров по названию или артикулу...'
        />
        <CommandList>
          <CommandGroup>
            {status === 'pending' ? (
              <Loading />
            ) : status === 'error' ? (
              <Error />
            ) : (
              <>
                {data.pages.map((group, i) => {
                  const itemIds = items.map(({ variantId }) => variantId)

                  return (
                    <Fragment key={i}>
                      {group.items.map((item) => {
                        const vtw = item.warehouseStockEntries?.[0]
                        const isSelected = vtw?.id
                          ? itemIds.includes(vtw.variantId ?? '')
                          : false

                        return (
                          <CommandItem
                            key={item.id}
                            defaultValue={item.id}
                            onSelect={() => {
                              if (isSelected) {
                                setItems(
                                  items.filter(
                                    (obj) => obj.variantId !== item.id
                                  )
                                )
                              } else if (vtw?.id) {
                                const newVtw: InventoryTransferItem = {
                                  quantity: vtw.warehouseQuantity ?? 0,
                                  variantId: vtw.variantId ?? '',
                                  warehouseQuantity: vtw.warehouseQuantity ?? 0,
                                  size: item.size,
                                  title: item.product?.title,
                                }
                                const newArray = items
                                newArray.push(newVtw)
                                setItems(newArray)
                              }
                            }}
                          >
                            <div className='flex gap-2 items-center'>
                              <span>{item.product?.title}</span>
                              <Badge className='w-fit' variant='outline'>
                                {item.size}
                              </Badge>
                              <span>{vtw?.warehouseQuantity} шт</span>
                            </div>
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4 shrink-0',
                                isSelected ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        )
                      })}
                    </Fragment>
                  )
                })}
                <div ref={(element) => setObserverTarget(element)}></div>
                {(isFetching || isFetchingNextPage) && <Loading />}
              </>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
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
              key={item.variantId}
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
