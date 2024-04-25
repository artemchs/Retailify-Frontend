import { SearchIcon } from 'lucide-react'
import { Input } from './input'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'

type Props = {
  searchValue?: string
  setSearchValue: (newValue?: string) => void
}

export default function SearchBarState({ setSearchValue, searchValue }: Props) {
  const [inputValue, setInputValue] = useState<string>(searchValue ?? '')

  const setQueryValue = useCallback(
    (value: string) => {
      setSearchValue(value)
    },
    [setSearchValue]
  )

  const debouncedSetQueryValue = useMemo(() => {
    return debounce(setQueryValue, 500)
  }, [setQueryValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSetQueryValue(value)
  }

  return (
    <div className='w-full lg:max-w-sm relative '>
      <SearchIcon className='h-4 w-4 text-muted-foreground absolute top-0 bottom-0 my-auto left-3 pointer-events-none' />
      <Input
        type='text'
        placeholder='Поиск...'
        className='pl-8'
        value={inputValue}
        onChange={onChange}
        autoFocus={true}
      />
    </div>
  )
}
