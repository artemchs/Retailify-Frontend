import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon, Search } from 'lucide-react'
import { InventoryAdjustmentVariant } from '../../types/create-inventory-adjustment-form-schema'
import { debounce } from 'lodash'
import Products from '@/api/services/Products'
import { Error, Loading } from '@/components/forms/CrudComboboxMultiple'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
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
  } = Products.useFindAllInfiniteListVariantForWarehouse({ query, warehouseId })

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
                  const vtwIds = vtws.map(
                    ({ variantToWarehouseId }) => variantToWarehouseId
                  )

                  return (
                    <Fragment key={i}>
                      {group.items.map((item) => {
                        const vtw = item.warehouseStockEntries?.[0]
                        const isSelected = vtw?.id
                          ? vtwIds.includes(vtw.id)
                          : false

                        return (
                          <CommandItem
                            key={item.id}
                            defaultValue={item.id}
                            onSelect={() => {
                              if (isSelected) {
                                setVtws(
                                  vtws.filter(
                                    (obj) => obj.variantId !== item.id
                                  )
                                )
                              } else if (vtw?.id) {
                                const newVtw: InventoryAdjustmentVariant = {
                                  quantityChange: 0,
                                  variantId: item.id,
                                  variantToWarehouseId: vtw.id,
                                  productTitle: item.product?.title,
                                  size: item.size,
                                  oldQuantity: vtw.warehouseQuantity,
                                  newQuantity: vtw.warehouseQuantity,
                                }
                                const newArray = vtws
                                newArray.push(newVtw)
                                setVtws(newArray)
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
