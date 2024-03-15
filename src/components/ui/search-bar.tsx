import { SearchIcon } from 'lucide-react'
import { Input } from './input'
import { RouteIds, useNavigate, useSearch } from '@tanstack/react-router'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { routeTree } from '@/lib/router/routeTree'

type Props = {
  routeId: RouteIds<typeof routeTree>
}

export default function SearchBar({ routeId }: Props) {
  const search = useSearch({
    from: routeId,
  })
  const navigate = useNavigate()

  // @ts-expect-error Not all routes have the "query" search param, and it is not intended to use this component in those routes.
  const [inputValue, setInputValue] = useState<string>(search.query ?? '')

  const setQueryValue = useCallback(
    (value: string) => {
      navigate({ search: (prev) => ({ ...prev, query: value }) })
    },
    [navigate]
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
