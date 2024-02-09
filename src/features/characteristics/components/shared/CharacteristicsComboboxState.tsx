import Characteristics from '@/api/services/Characteristics'
import {
  Error,
  Loading,
  NoResults,
} from '@/components/forms/CrudComboboxMultiple'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import { Characteristic } from '@/types/entities/Characteristic'
import { debounce } from 'lodash'
import { ChevronsUpDown, X } from 'lucide-react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import CreateCharacteristicDialog from '../actions/create/CreateCharacteristicDialog'
import DeleteCharacteristicAlertDialog from '../actions/delete/DeleteCharacteristicAlert'
import EditCharacteristicDialog from '../actions/edit/EditCharacteristicDialog'

type CharacteristicValue = {
  characteristicId: string
  id?: string
}

type Props = {
  values: CharacteristicValue[]
  setValues: (newValues: CharacteristicValue[]) => void
}

export default function CharacteristicsComboboxState({
  setValues,
  values,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Characteristics.useFindAll({ query })

  function onSuccess(id: string) {
    setValues(values.filter((obj) => obj.characteristicId !== id))
  }

  const [searchInputValue, setSearchInputValue] = useState('')
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
  useScrollToFetchData(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    observerTarget
  )

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpened}
          className='w-full justify-between'
        >
          {values && values.length >= 1 ? (
            <div className='flex items-center gap-2'>
              <Button
                size='icon'
                className='h-6 w-6'
                variant='outline'
                onClick={(e) => {
                  e.stopPropagation()
                  setValues([])
                }}
              >
                <X className='h-4 w-4' />
              </Button>
              <span className='truncate max-w-64'>{`Выбрано: ${values.length}`}</span>
            </div>
          ) : (
            <span className='text-muted-foreground font-normal'>
              Выберите характеристики для товара
            </span>
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
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
                    const items = group.items as Characteristic[]

                    return (
                      <Fragment key={i}>
                        {items.map((item) => {
                          const id = String(item.id)
                          const name = String(item.name)
                          const isSelected = values
                            .map(({ characteristicId }) => characteristicId)
                            .includes(id)

                          return (
                            <CommandItem
                              key={id}
                              value={id}
                              className='flex items-center justify-between gap-2 cursor-pointer'
                              onSelect={() => {
                                if (isSelected) {
                                  setValues(
                                    values.filter(
                                      (obj) => obj.characteristicId !== id
                                    )
                                  )
                                } else {
                                  const newValues = [...values]
                                  newValues.push({
                                    characteristicId: id,
                                    id: undefined,
                                  })
                                  setValues(newValues)
                                }
                              }}
                            >
                              <div className='flex items-center gap-2'>
                                <Checkbox checked={isSelected} />
                                <span>{name}</span>
                              </div>
                              <div
                                className='flex items-center gap-2'
                                onClick={(e) => e.stopPropagation()}
                              >
                                <EditCharacteristicDialog
                                  id={id}
                                  onSuccess={onSuccess}
                                />
                                <DeleteCharacteristicAlertDialog
                                  id={id}
                                  onSuccess={onSuccess}
                                />
                              </div>
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
          <CommandGroup className='border-t border-t-input'>
            <CreateCharacteristicDialog />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
