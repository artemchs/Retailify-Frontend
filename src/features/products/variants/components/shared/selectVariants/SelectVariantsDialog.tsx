import Products from '@/api/services/Products'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DataTableState,
  DataTableStateBottomControls,
} from '@/components/ui/data-table-state'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Variant } from '@/types/entities/Variant'
import {
  ColumnDef,
  ColumnDefTemplate,
  HeaderContext,
  RowSelectionState,
} from '@tanstack/react-table'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { columns as baseColumns } from '../../table/columns'
import Warehouses from '@/api/services/Warehouses'
import { VariantsSearchParamsOrderBy } from '../../../types/findAll-variants-search-params'
import DropdownOrderBy from '@/components/orderBy/DropdownOrderBy'
import FillOutSelectedVariants from '@/features/goods-receipts/components/shared/FillOutSelectedVariants.tsx'
import { GoodsReceiptVariant } from '@/features/goods-receipts/types/create-goods-receipt-form-schema.ts'

type Props = {
  selectedRows: RowSelectionState
  selectedValues: Variant[]
  setSelectedRows: Dispatch<SetStateAction<RowSelectionState>>
  setSelectedValues: (
    type: 'variant' | 'goods-receipt-item',
    newValues: Variant[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prev: any[]
  ) => void
  idField: string
  selectWithEditing?: boolean
}

export default function SelectVariantsDialog({
  selectedRows,
  selectedValues,
  setSelectedRows,
  setSelectedValues,
  idField,
  selectWithEditing,
}: Props) {
  const [selectedData, setSelectedData] = useState<Variant[]>([])

  const [isOpened, setIsOpened] = useState(false)
  const [bottomControlsState, setBottomControlsState] =
    useState<DataTableStateBottomControls>({
      page: 1,
      rowsPerPage: 20,
    })

  const [orderBy, setOrderBy] = useState<VariantsSearchParamsOrderBy>({})

  const replaceHeadersArray: {
    id: string
    header: ColumnDefTemplate<HeaderContext<Variant, unknown>>
  }[] = useMemo(
    () => [
      {
        id: 'Размер',
        header: () => (
          <DropdownOrderBy
            label='Размер'
            value={orderBy?.size}
            setValue={(val) => setOrderBy({ ...orderBy, size: val })}
          />
        ),
      },
      {
        id: 'Артикул магазин',
        header: () => (
          <DropdownOrderBy
            label='Артикул магазин'
            value={orderBy?.sku}
            setValue={(val) => setOrderBy({ ...orderBy, sku: val })}
          />
        ),
      },
      {
        id: 'Артикул родной',
        header: () => (
          <DropdownOrderBy
            label='Артикул родной'
            value={orderBy?.supplierSku}
            setValue={(val) => setOrderBy({ ...orderBy, supplierSku: val })}
          />
        ),
      },
      {
        id: 'Штрих-код',
        header: () => (
          <DropdownOrderBy
            label='Штрих-код'
            value={orderBy?.barcode}
            setValue={(val) => setOrderBy({ ...orderBy, barcode: val })}
          />
        ),
      },
      {
        id: 'Цена без скидки',
        header: () => (
          <DropdownOrderBy
            label='Цена без скидки'
            value={orderBy?.price}
            setValue={(val) => setOrderBy({ ...orderBy, price: val })}
          />
        ),
      },
      {
        id: 'Скидка',
        header: () => (
          <DropdownOrderBy
            label='Скидка'
            value={orderBy?.sale}
            setValue={(val) => setOrderBy({ ...orderBy, sale: val })}
          />
        ),
      },
      {
        id: 'Полученое кол-во',
        header: () => (
          <DropdownOrderBy
            label='Полученое кол-во'
            value={orderBy?.totalReceivedQuantity}
            setValue={(val) =>
              setOrderBy({ ...orderBy, totalReceivedQuantity: val })
            }
          />
        ),
      },
      {
        id: 'Кол-во на складах',
        header: () => (
          <DropdownOrderBy
            label='Кол-во на складах'
            value={orderBy?.totalWarehouseQuantity}
            setValue={(val) =>
              setOrderBy({ ...orderBy, totalWarehouseQuantity: val })
            }
          />
        ),
      },
    ],
    [orderBy]
  )

  const [searchValue, setSearchValue] = useState<string | undefined>('')

  const { data, isLoading, isError } = Products.useFindAllVariants({
    ...bottomControlsState,
    query: searchValue,
    orderBy,
    // @ts-expect-error asdfasdf
    excludeIds: selectedValues.map((obj) => obj[idField]),
  })

  const { data: warehousesData, isLoading: isLoadingWarehouses } =
    Warehouses.useGetAll()
  const [columns, setColumns] = useState<ColumnDef<Variant>[]>(baseColumns)

  useEffect(() => {
    if (warehousesData) {
      const warehouseColumns: ColumnDef<Variant>[] = warehousesData.map(
        ({ id, name }) => ({
          id: `warehouse-${id}`,
          header: name,
          cell: ({ row }) => {
            const quantity =
              row.original.warehouseStockEntries?.find(
                (obj) => obj.warehouseId === id
              )?.warehouseQuantity ?? 0

            return <div className='text-right'>{quantity}</div>
          },
        })
      )

      const updatedColumns = [
        ...baseColumns.slice(0, baseColumns.length - 1).map((props) => {
          const customHeader = replaceHeadersArray?.find(
            (obj) => obj.id === props.id
          )

          if (!customHeader?.header) return props

          return {
            ...props,
            header: customHeader.header,
            id: customHeader.id,
          }
        }),
        ...warehouseColumns,
      ]

      setColumns(updatedColumns)
    }
  }, [warehousesData, replaceHeadersArray])

  const [isFillOutSelectedVariantsOpened, setIsFillOutSelectedVariantsOpened] =
    useState(false)

  const [fillOutSelectedVariants, setFillOutSelectedVariants] = useState<
    GoodsReceiptVariant[]
  >([])

  const handleSelect = () => {
    if (selectWithEditing) {
      setIsFillOutSelectedVariantsOpened(true)

      setFillOutSelectedVariants(
        selectedData.map(({ id, size, product, price }) => ({
          size,
          variantId: id,
          productId: product?.id ?? '',
          productName: product?.title ?? '',
          productSku: product?.sku ?? '',
          sellingPrice: price,
          receivedQuantity: 0,
          supplierPrice: 0,
          productImgId: product?.media?.at(0)?.id,
        }))
      )
    } else {
      setSelectedValues('goods-receipt-item', selectedData, selectedValues)
    }
    setIsOpened(false)
  }

  function handleClose() {
    setSelectedData([])
    setSelectedRows({})
  }

  return (
    <>
      {selectWithEditing && (
        <FillOutSelectedVariants
          isOpened={isFillOutSelectedVariantsOpened}
          setIsOpened={setIsFillOutSelectedVariantsOpened}
          variants={fillOutSelectedVariants}
          setVariants={(variants) => setFillOutSelectedVariants([...variants])}
          onSubmit={(variants) => {
            setSelectedValues(
              'goods-receipt-item',
              variants as unknown as Variant[],
              selectedValues
            )
            handleClose()
            setIsFillOutSelectedVariantsOpened(false)
          }}
        />
      )}
      <Dialog
        open={isOpened}
        onOpenChange={(open) => {
          if (!open) {
            handleClose()
          }
          setIsOpened(open)
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={isOpened}
            className='w-full justify-between'
          >
            {selectedValues && selectedValues.length >= 1 ? (
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'icon' }),
                    'h-6 w-6'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()

                    setSelectedValues('goods-receipt-item', [], [])
                    setSelectedRows({})
                  }}
                >
                  <X className='h-4 w-4' />
                </div>
                <span className='truncate max-w-96'>
                  {selectedValues && `Выбрано: ${selectedValues.length}`}
                </span>
              </div>
            ) : (
              <span className='text-muted-foreground font-normal'>
                Выберите товары...
              </span>
            )}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-screen-2xl max-h-[90%] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Выбрать товары:</DialogTitle>
          </DialogHeader>
          <div className='flex shrink max-w-[1471px]'>
            <DataTableState
              bottomControlsState={bottomControlsState}
              setBottomControlsState={setBottomControlsState}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              columns={columns}
              data={data?.items ?? []}
              isError={isError || isLoadingWarehouses}
              isLoading={isLoading || isLoadingWarehouses}
              topBarElements={
                <>
                  <Button onClick={handleSelect}>
                    <Check className='h-4 w-4 mr-2' />
                    Выбрать {selectedData.length}
                  </Button>
                </>
              }
              totalPages={data?.info.totalPages ?? 1}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectedRowsWithData={selectedData}
              setSelectedRowsWithData={setSelectedData}
              isSingle={false}
              selectOnRowClick={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
