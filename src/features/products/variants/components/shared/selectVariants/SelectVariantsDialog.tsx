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
import { ColumnDef, RowSelectionState } from '@tanstack/react-table'
import { ChevronsUpDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { columns as baseColumns } from '../../table/columns'
import Warehouses from '@/api/services/Warehouses'

type Props = {
  selectedValues: Variant[]
  setSelectedValues: (newValues: Variant[]) => void
  selectedRows: RowSelectionState
  setSelectedRows: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

export default function SelectVariantsDialog({
  selectedRows,
  selectedValues,
  setSelectedRows,
  setSelectedValues,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [bottomControlsState, setBottomControlsState] =
    useState<DataTableStateBottomControls>({
      page: 1,
      rowsPerPage: 20,
    })
  const [searchValue, setSearchValue] = useState<string | undefined>('')

  const { data, isLoading, isError } = Products.useFindAllVariants({
    ...bottomControlsState,
    query: searchValue,
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
        ...baseColumns.slice(0, baseColumns.length - 1),
        ...warehouseColumns,
      ]

      setColumns(updatedColumns)
    }
  }, [warehousesData])

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
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

                  setSelectedValues([])
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
        <DataTableState
          bottomControlsState={bottomControlsState}
          setBottomControlsState={setBottomControlsState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          columns={columns}
          data={data?.items ?? []}
          isError={isError || isLoadingWarehouses}
          isLoading={isLoading || isLoadingWarehouses}
          topBarElements={<></>}
          totalPages={data?.info.totalPages ?? 1}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectedRowsWithData={selectedValues}
          setSelectedRowsWithData={setSelectedValues}
          isSingle={false}
          selectOnRowClick={true}
        />
      </DialogContent>
    </Dialog>
  )
}
