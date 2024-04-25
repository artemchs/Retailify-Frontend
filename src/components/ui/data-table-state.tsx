/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ExpandedState,
  Row,
  RowSelectionState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Label } from './label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { Fragment, useEffect, useState } from 'react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Toggle } from './toggle'
import SearchBarState from './search-bar-state'
import PaginationControlsState from './pagination-controls-state'
import { cn } from '@/lib/utils'

export type DataTableStateBottomControls = {
  page: number
  rowsPerPage: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  isError: boolean
  totalPages: number
  topBarElements: React.ReactNode
  childrenField?: keyof TData
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand?: (row: Row<TData>) => boolean
  selectedRows?: RowSelectionState
  setSelectedRows?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  selectedRowsWithData?: any[]
  setSelectedRowsWithData?: (items: any[]) => void
  searchValue?: string
  setSearchValue: (newValue?: string) => void
  bottomControlsState: DataTableStateBottomControls
  setBottomControlsState: (newValue: DataTableStateBottomControls) => void
  isSingle?: boolean
  selectOnRowClick?: boolean
}

export function DataTableState<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
  totalPages,
  topBarElements,
  childrenField,
  getRowCanExpand,
  renderSubComponent,
  selectedRows,
  setSelectedRows,
  selectedRowsWithData,
  setSelectedRowsWithData,
  setSearchValue,
  searchValue,
  bottomControlsState,
  setBottomControlsState,
  isSingle,
  selectOnRowClick,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const getRowId = (originalRow: unknown) => {
    return (originalRow as { id: string }).id
  }

  const table = useReactTable({
    enableMultiRowSelection: isSingle ? false : true,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setSelectedRows ? setSelectedRows : setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    manualSorting: true,
    manualFiltering: true,
    getSubRows: childrenField
      ? (row) => row[childrenField] as TData[] | undefined
      : undefined,
    onExpandedChange: setExpanded,
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      rowSelection: selectedRows ? selectedRows : rowSelection,
      columnVisibility,
      expanded,
    },
  })

  useEffect(() => {
    if (setSelectedRowsWithData) {
      const handleSelectionState = (selections?: RowSelectionState) => {
        const items = selections
          ? Object.keys(selections).map(
              (key) =>
                table.getSelectedRowModel().rowsById[key]?.original ||
                selectedRowsWithData?.find((row) => row.id === key)
            )
          : []

        setSelectedRowsWithData(items)
      }

      handleSelectionState(selectedRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows])

  return (
    <div className='h-full max-h-full flex flex-col gap-4'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='flex flex-col lg:flex-row flex-grow lg:items-center gap-2'>
          <SearchBarState
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
          {selectedRows && setSelectedRows
            ? Object.keys(selectedRows).length >= 1 && (
                <div className='flex items-center gap-1'>
                  <Button
                    variant='secondary'
                    onClick={() => setSelectedRows({})}
                  >
                    <X className='h-4 w-4 mr-2' />
                    Выбрано: {Object.keys(selectedRows).length}
                  </Button>
                </div>
              )
            : Object.keys(rowSelection).length >= 1 && (
                <div className='flex items-center gap-1'>
                  <Button
                    variant='secondary'
                    onClick={() => setRowSelection({})}
                  >
                    <X className='h-4 w-4 mr-2' />
                    Выбрано: {Object.keys(rowSelection).length}
                  </Button>
                </div>
              )}
        </div>
        <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
          {topBarElements}
          <ColumnsVisibilityDropdown table={table} />
        </div>
      </div>
      <div className='rounded-md border max-h-full overflow-y-auto shrink flex'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24'>
                  <div className='flex w-full justify-center items-center gap-2 text-muted-foreground'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    <span>Загрузка...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <p className='text-destructive'>
                    Возникла неожиданная ошибка во время загрузки. Попробуйте
                    перезагрузить страницу. Если проблема не пропадает,
                    свяжитесь с разработчиком.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow
                        className={cn(selectOnRowClick && 'cursor-pointer')}
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={() => {
                          if (selectOnRowClick) {
                            row.toggleSelected()
                          }
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && renderSubComponent && (
                        <TableRow className='hover:bg-transparent'>
                          <TableCell colSpan={row.getVisibleCells().length}>
                            {renderSubComponent({ row })}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      Нет результатов.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {isLoading ? (
        <LoadingBottomControls />
      ) : isError ? (
        <></>
      ) : (
        <BottomControls
          bottomControlsState={bottomControlsState}
          setBottomControlsState={setBottomControlsState}
          totalPages={totalPages}
          rows={table.getFilteredRowModel().rows.length}
          selected={table.getFilteredSelectedRowModel().rows.length}
        />
      )}
    </div>
  )
}

type BottomControlsProps = {
  totalPages: number
  selected: number
  rows: number
  bottomControlsState: DataTableStateBottomControls
  setBottomControlsState: (newValue: DataTableStateBottomControls) => void
}

function BottomControls({
  totalPages,
  rows,
  selected,
  bottomControlsState,
  setBottomControlsState,
}: BottomControlsProps) {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
      <span className='text-sm text-muted-foreground'>
        {selected ?? 0} из {rows ?? 1} строк(и) выбрано.
      </span>
      <div className='flex flex-col-reverse lg:flex-row lg:items-center gap-4 lg:gap-6'>
        <RowsPerPageSelector
          bottomControlsState={bottomControlsState}
          setBottomControlsState={setBottomControlsState}
        />
        <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-2 lg:gap-6'>
          Страница {bottomControlsState.page} из {totalPages}
          <PaginationControlsState
            bottomControlsState={bottomControlsState}
            setBottomControlsState={setBottomControlsState}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  )
}

function RowsPerPageSelector({
  bottomControlsState,
  setBottomControlsState,
}: {
  bottomControlsState: DataTableStateBottomControls
  setBottomControlsState: (newValue: DataTableStateBottomControls) => void
}) {
  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor='rowsPerPageSelect'>Строк на странице</Label>
      <Select
        defaultValue={bottomControlsState.rowsPerPage.toString()}
        onValueChange={(value) =>
          setBottomControlsState({
            ...bottomControlsState,
            rowsPerPage: parseInt(value),
          })
        }
      >
        <SelectTrigger className='w-20' id='rowsPerPageSelect'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='30'>30</SelectItem>
          <SelectItem value='40'>40</SelectItem>
          <SelectItem value='50'>50</SelectItem>
          <SelectItem value='100'>100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function ColumnsVisibilityDropdown<TData>({
  table,
}: {
  table: TableType<TData>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <SlidersHorizontal className='h-4 w-4 mr-2' />
          Столбцы
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LoadingBottomControls() {
  return <></>
}

export function ExpandToggle({
  disabled,
  isExpanded,
  toggle,
}: {
  disabled: boolean
  isExpanded: boolean
  toggle: () => void
}) {
  return (
    <Toggle size='sm' onClick={toggle} disabled={disabled}>
      {isExpanded ? (
        <ChevronDown className='h-4 w-4' />
      ) : (
        <ChevronRight className='h-4 w-4' />
      )}
    </Toggle>
  )
}
