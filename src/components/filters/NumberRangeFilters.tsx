import { debounce } from 'lodash'
import { Input } from '../ui/input'
import React, { useCallback, useMemo, useState } from 'react'

export type NumbersRange = {
  from?: number
  to?: number
}

type Props = {
  setRange(value?: NumbersRange): void
  range?: NumbersRange
}

export default function NumberRangeFilters({
  range: propRange,
  setRange,
}: Props) {
  const [localRange, setLocalRange] = useState<NumbersRange>(propRange || {})

  const setPropRange = useCallback(
    (value?: NumbersRange) => {
      setRange(value)
    },
    [setRange]
  )
  const debouncedSetRange = useMemo(() => {
    return debounce(setPropRange, 350)
  }, [setPropRange])

  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const data = {
        ...localRange,
        from: value ? parseFloat(value) : undefined,
      }
      setLocalRange(data)
      debouncedSetRange(data)
    },
    [localRange, debouncedSetRange]
  )

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const data = {
        ...localRange,
        to: value ? parseFloat(value) : undefined,
      }
      setLocalRange(data)
      debouncedSetRange(data)
    },
    [localRange, debouncedSetRange]
  )

  const handleBlur = useCallback(() => {
    setRange(localRange)
  }, [localRange, setRange])

  return (
    <div className='flex items-center gap-2'>
      <Input
        placeholder='от'
        type='number'
        value={localRange.from ?? ''}
        onChange={handleFromChange}
        onBlur={handleBlur}
      />
      <Input
        placeholder='до'
        type='number'
        value={localRange.to ?? ''}
        onChange={handleToChange}
        onBlur={handleBlur}
      />
    </div>
  )
}
