import Products, { ProductsFindAllInfiniteList } from '@/api/services/Products'
import { Error, Loading } from '@/components/forms/CrudComboboxMultiple'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { InfiniteData } from '@tanstack/react-query'
import {
  DisplayNoFile,
  DisplayUploadedFile,
} from '@/features/products/components/shared/form/media/DisplayUploadedFile'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Variant } from './ProductVariantsTable'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function SelectProductsVariants({ field, form }: Props) {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const variants = field.value as Variant[]
  function setVariants(newVariants: Variant[]) {
    form.setValue('variants', newVariants)
  }

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
  } = Products.useFindAllInfiniteList({ query })

  useScrollToFetchData(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    observerTarget
  )

  return (
    <>
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
          <CommandGroup className='max-h-full overflow-auto'>
            {status === 'pending' ? (
              <Loading />
            ) : status === 'error' ? (
              <Error />
            ) : (
              <ProductsTable
                data={data}
                setObserverTarget={setObserverTarget}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                setVariants={setVariants}
                variants={variants}
              />
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

type ProductsTableProps = {
  setObserverTarget: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
  data: InfiniteData<ProductsFindAllInfiniteList, unknown>
  isFetching: boolean
  isFetchingNextPage: boolean
  setVariants(newVariants: Variant[]): void
  variants: Variant[]
}

function ProductsTable({
  data,
  setObserverTarget,
  isFetching,
  isFetchingNextPage,
  setVariants,
  variants,
}: ProductsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Медиа</TableHead>
          <TableHead>Название/рамер</TableHead>
          <TableHead>Цена продажи (грн)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {data.pages.map((group, i) => {
            const variantIds = variants.map(({ variantId }) => variantId)

            return (
              <Fragment key={i}>
                {group.items.map((item) => {
                  const productVariantIds = item.variants.map(({ id }) => id)
                  const isSelectedAll = productVariantIds.every((id) =>
                    variantIds.includes(id)
                  )
                  const isSelectedPartially = productVariantIds.some((id) =>
                    variantIds.includes(id)
                  )

                  return (
                    <Fragment key={item.id}>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={
                              isSelectedAll ||
                              (isSelectedPartially && 'indeterminate')
                            }
                            onCheckedChange={(value) => {
                              if (value) {
                                const newSelectedVariants: Variant[] =
                                  item.variants.map(({ id, size }) => ({
                                    receivedQuantity: 0,
                                    supplierPrice: 0,
                                    variantId: id,
                                    productName: item.title,
                                    size,
                                    productId: item.id,
                                  }))
                                setVariants([
                                  ...variants,
                                  ...newSelectedVariants,
                                ])
                              } else {
                                const newVariants = variants.filter(
                                  ({ variantId }) =>
                                    !productVariantIds.includes(variantId)
                                )
                                setVariants(newVariants)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {item.media?.[0].id ? (
                            <DisplayUploadedFile
                              id={item.media?.[0].id}
                              className='h-12 w-12 shrink-0'
                            />
                          ) : (
                            <DisplayNoFile className='h-12 w-12 shrink-0' />
                          )}
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {item.variants.map((variant) => (
                        <TableRow key={variant.id}>
                          <TableCell colSpan={2}>
                            <div className='flex w-full justify-end'>
                              <Checkbox
                                checked={variantIds.includes(variant.id)}
                                onCheckedChange={(value) => {
                                  if (value) {
                                    setVariants([
                                      ...variants,
                                      {
                                        receivedQuantity: 0,
                                        supplierPrice: 0,
                                        variantId: variant.id,
                                        productName: item.title,
                                        size: variant.size,
                                        productId: item.id,
                                      },
                                    ])
                                  } else {
                                    const newArray = variants.filter(
                                      (val) => val.variantId !== variant.id
                                    )
                                    setVariants(newArray)
                                  }
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{variant.size}</TableCell>
                          <TableCell className='text-right'>
                            {variant.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  )
                })}
              </Fragment>
            )
          })}
          <div ref={(element) => setObserverTarget(element)}></div>
          {(isFetching || isFetchingNextPage) && <Loading />}
        </>
      </TableBody>
    </Table>
  )
}
