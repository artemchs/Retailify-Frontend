import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronsUpDown, X } from 'lucide-react'
import Products from '@/api/services/Products'
import {
  DataTableState,
  DataTableStateBottomControls,
} from '@/components/ui/data-table-state'
import { productColumns } from './productsDialogColumns'
import { RowSelectionState } from '@tanstack/react-table'

type Props = {
  selectedValues: {
    id: string
    title: string
    sku: string
  }[]
  setSelectedValues: (
    newValues: {
      id: string
      title: string
      sku: string
    }[]
  ) => void
  selectedRows: RowSelectionState
  setSelectedRows: React.Dispatch<React.SetStateAction<RowSelectionState>>
  single?: boolean
}

export default function SelectProductsDialog({
  selectedValues,
  setSelectedValues,
  selectedRows,
  setSelectedRows,
  single,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [bottomControlsState, setBottomControlsState] =
    useState<DataTableStateBottomControls>({
      page: 1,
      rowsPerPage: 20,
    })
  const [searchValue, setSearchValue] = useState<string | undefined>('')

  const { data, isLoading, isError } = Products.useFindAll({
    page: bottomControlsState.page,
    rowsPerPage: bottomControlsState.rowsPerPage,
    query: searchValue,
  })

  const columnsForSingleSelect = productColumns.map((obj) => {
    if (obj.id === 'controls') {
      obj.header = undefined
    }

    return obj
  })

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
              <Button
                type='button'
                size='icon'
                className='h-6 w-6'
                variant='outline'
                onClick={(e) => {
                  e.stopPropagation()

                  setSelectedValues([])
                  setSelectedRows({})
                }}
              >
                <X className='h-4 w-4' />
              </Button>
              <span className='truncate max-w-96'>
                {selectedValues &&
                  (single
                    ? selectedValues?.[0].title
                      ? selectedValues[0].title
                      : ''
                    : `Выбрано: ${selectedValues.length}`)}
              </span>
            </div>
          ) : (
            <span className='text-muted-foreground font-normal'>
              {single ? 'Выберите товар...' : 'Выберите товары...'}
            </span>
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-screen-2xl'>
        <DialogHeader>
          <DialogTitle>Выбрать товары:</DialogTitle>
        </DialogHeader>
        <DataTableState
          bottomControlsState={bottomControlsState}
          setBottomControlsState={setBottomControlsState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          columns={single ? columnsForSingleSelect : productColumns}
          data={data?.items ?? []}
          isError={isError}
          isLoading={isLoading}
          topBarElements={<></>}
          totalPages={data?.info.totalPages ?? 1}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectedRowsWithData={selectedValues}
          setSelectedRowsWithData={setSelectedValues}
          isSingle={single}
          selectOnRowClick={true}
        />
      </DialogContent>
    </Dialog>
  )
}
