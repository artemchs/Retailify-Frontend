import {
  ColumnDef,
  ExpandedState,
  Row,
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
import { RouteIds, useNavigate, useSearch } from '@tanstack/react-router'
import PaginationControls from './pagination-controls'
import { routeTree } from '@/lib/router/routeTree'
import SearchBar from './search-bar'
import { Fragment, useState } from 'react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Toggle } from './toggle'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  isError: boolean
  routeId: RouteIds<typeof routeTree>
  totalPages: number
  topBarElements: React.ReactNode
  childrenField?: keyof TData
  RenderSubComponent?: ({ row }: { row: Row<TData> }) => JSX.Element
  getRowCanExpand?: (row: Row<TData>) => boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
  routeId,
  totalPages,
  topBarElements,
  childrenField,
  RenderSubComponent,
  getRowCanExpand,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const getRowId = (originalRow: unknown) => {
    return (originalRow as { id: string }).id
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    manualSorting: true,
    manualFiltering: true,
    getSubRows: childrenField
      ? (row) => row[childrenField] as TData[] | undefined
      : undefined,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
    onExpandedChange: setExpanded,
    state: {
      rowSelection,
      columnVisibility,
      expanded,
    },
  })

  return (
    <div className='space-y-4'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='flex flex-col lg:flex-row flex-grow lg:items-center gap-2'>
          <SearchBar routeId={routeId} />
          {Object.keys(rowSelection).length >= 1 && (
            <div className='flex items-center gap-1'>
              <Button variant='secondary' onClick={() => setRowSelection({})}>
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
      <div className='rounded-md border'>
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
                      <TableRow data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {RenderSubComponent && row.getIsExpanded() && (
                        <TableRow className='hover:bg-transparent'>
                          {/* 2nd row is a custom 1 cell row */}
                          <TableCell colSpan={row.getVisibleCells().length}>
                            <RenderSubComponent row={row} />
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
          routeId={routeId}
          totalPages={totalPages}
          rows={table.getFilteredRowModel().rows.length}
          selected={table.getFilteredSelectedRowModel().rows.length}
        />
      )}
    </div>
  )
}

type BottomControlsProps = {
  routeId: RouteIds<typeof routeTree>
  totalPages: number
  selected: number
  rows: number
}

function BottomControls({
  routeId,
  totalPages,
  rows,
  selected,
}: BottomControlsProps) {
  // @ts-expect-error Not all routes have the "page" search param, and it is not intended to use this component in those routes.
  const { page, rowsPerPage } = useSearch({
    from: routeId,
  })

  return (
    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
      <span className='text-sm text-muted-foreground'>
        {selected ?? 0} из {rows ?? 1} строк(и) выбрано.
      </span>
      <div className='flex flex-col-reverse lg:flex-row lg:items-center gap-4 lg:gap-6'>
        <RowsPerPageSelector rowsPerPage={String(rowsPerPage)} />
        <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-2 lg:gap-6'>
          Страница {page} из {totalPages}
          <PaginationControls routeId={routeId} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

function RowsPerPageSelector({ rowsPerPage }: { rowsPerPage: string }) {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor='rowsPerPageSelect'>Строк на странице</Label>
      <Select
        defaultValue={rowsPerPage}
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              rowsPerPage: Number(value),
              page: 1,
            }),
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
