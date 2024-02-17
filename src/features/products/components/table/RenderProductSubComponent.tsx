import { ProductFindAll } from '@/types/entities/Product'
import { Row } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CurrencyFormatter } from '@/components/ui/units'
import { cn } from '@/lib/utils'
import Products from '@/api/services/Products'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function RenderProductSubComponent({
  row,
}: {
  row: Row<ProductFindAll>
}) {
  const [query, setQuery] = useState('')

  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = Products.useFindAllInfiniteListVariant({ query }, row.original.id)

  const [searchInputValue, setSearchInputValue] = useState('')

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

  useScrollToFetchData(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    observerTarget
  )

  return (
    <div className='pl-12 flex flex-col gap-4'>
      <Input
        placeholder='Поиск по размеру...'
        onChange={(e) => {
          const val = e.target.value
          setSearchInputValue(val)
          debouncedSetQueryValue(val)
        }}
        value={searchInputValue}
        className='w-fit'
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Размер</TableHead>
            <TableHead className='text-right'>Цена</TableHead>
            <TableHead className='text-right'>Скидка</TableHead>
            <TableHead className='text-right'>Цена со скидкой</TableHead>
            <TableHead className='text-right'>Полученное количество</TableHead>
            <TableHead className='text-right'>Количество на складах</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status === 'pending' ? (
            <TableRow>
              <TableCell
                colSpan={row.getVisibleCells().length}
                className='h-24'
              >
                <div className='flex w-full justify-center items-center gap-2 text-muted-foreground'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>Загрузка...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : status === 'error' ? (
            <TableRow>
              <TableCell
                colSpan={row.getVisibleCells().length}
                className='h-24 text-center'
              >
                <p className='text-destructive'>
                  Возникла неожиданная ошибка во время загрузки. Попробуйте
                  перезагрузить страницу. Если проблема не пропадает, свяжитесь
                  с разработчиком.
                </p>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.items.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>
                        <span className='font-medium'>{variant.size}</span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <CurrencyFormatter value={variant.price} />
                      </TableCell>
                      <TableCell
                        className={cn(
                          'text-right text-muted-foreground',
                          variant.sale && variant.sale > 0 && 'text-secondary'
                        )}
                      >
                        {variant.sale || 0}%
                      </TableCell>
                      <TableCell className='text-right'>
                        <CurrencyFormatter
                          value={
                            variant.price *
                            ((variant.sale && variant.sale / 100) || 1)
                          }
                        />
                      </TableCell>
                      <TableCell className='text-right'>
                        {variant.totalReceivedQuantity}
                      </TableCell>
                      <TableCell className='text-right'>
                        {variant.totalWarehouseQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
              <div ref={(element) => setObserverTarget(element)}></div>
              {(isFetching || isFetchingNextPage) && (
                <TableRow>
                  <TableCell
                    colSpan={row.getVisibleCells().length}
                    className='h-24'
                  >
                    <div className='flex w-full justify-center items-center gap-2 text-muted-foreground'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span>Загрузка...</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
