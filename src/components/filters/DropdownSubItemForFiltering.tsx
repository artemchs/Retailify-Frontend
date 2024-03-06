import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import {
  Error,
  Loading,
  NoResults,
} from '@/components/forms/CrudComboboxMultiple'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { debounce } from 'lodash'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

type Props<Entity, EntityFindAll> = {
  setQuery: React.Dispatch<React.SetStateAction<string>>
  data: InfiniteData<EntityFindAll, unknown> | undefined
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<EntityFindAll, unknown>, Error>
  >
  hasNextPage: boolean
  isFetching: boolean
  isFetchingNextPage: boolean
  status: 'error' | 'pending' | 'success'
  title: string
  idField: keyof Entity
  nameField: keyof Entity
  itemsField: keyof EntityFindAll
  ids: string[]
  setIds: (newIds?: string[]) => void
}

export default function DropdownSubItemForFiltering<Entity, EntityFindAll>({
  ids,
  setIds,
  setQuery,
  data,
  fetchNextPage,
  hasNextPage,
  idField,
  isFetching,
  isFetchingNextPage,
  itemsField,
  nameField,
  title,
  status,
}: Props<Entity, EntityFindAll>) {
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
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className='flex items-center gap-2'>
          {title}{' '}
          {ids.length >= 1 && (
            <Badge className='h-5' variant='secondary'>
              {ids.length}
            </Badge>
          )}
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className='p-0 w-36 lg:w-auto'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Поиск...'
            className='h-9'
            value={searchInputValue}
            onValueChange={(value) => {
              setSearchInputValue(value)
              debouncedSetQueryValue(value)
            }}
          />
          <CommandGroup className='max-h-40 overflow-y-auto'>
            {status === 'pending' ? (
              <Loading />
            ) : status === 'error' ? (
              <Error />
            ) : (
              <>
                {data && data.pages && data.pages.length >= 1 ? (
                  data.pages.map((group, i) => {
                    const items = group[itemsField] as Entity[]

                    return (
                      <Fragment key={i}>
                        {items.map((item) => {
                          const id = String(item[idField])
                          const name = String(item[nameField])
                          const isSelected = ids.includes(id)

                          return (
                            <CommandItem
                              key={id}
                              value={id}
                              className='flex items-center justify-between gap-2 cursor-pointer'
                              onSelect={() =>
                                setIds(
                                  isSelected
                                    ? ids.filter((val) => val !== id)
                                    : [...ids, id]
                                )
                              }
                            >
                              {name}
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
                  })
                ) : (
                  <NoResults />
                )}
                <div ref={(element) => setObserverTarget(element)}></div>
                {(isFetching || isFetchingNextPage) && <Loading />}
              </>
            )}
          </CommandGroup>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
