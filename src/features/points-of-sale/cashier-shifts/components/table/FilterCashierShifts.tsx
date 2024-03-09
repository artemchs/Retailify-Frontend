import DropdownFilter from '@/components/filters/DropdownFilter'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { pointOfSaleRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateRange } from 'react-day-picker'

export default function FilterCashierShifts() {
  const { createdAt, closedAt } = useSearch({
    from: pointOfSaleRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (createdAt) number += 1
    if (closedAt) number += 1

    return number
  }

  function setCreatedAt(value?: DateRange) {
    navigate({
      search: (prev) => ({ ...prev, createdAt: value }),
    })
  }

  function setClosedAt(value?: DateRange) {
    navigate({
      search: (prev) => ({ ...prev, closedAt: value }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({
        ...prev,
        createdAt: undefined,
        closedAt: undefined,
      }),
    })
  }

  return (
    <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
      <div className='p-2 flex flex-col gap-2'>
        <Label>Открыта:</Label>
        <DatePickerWithRange
          date={{
            from: createdAt?.from,
            to: createdAt?.to,
          }}
          setDate={setCreatedAt}
        />
      </div>
      <div className='p-2 flex flex-col gap-2'>
        <Label>Закрыта:</Label>
        <DatePickerWithRange
          date={{
            from: closedAt?.from,
            to: closedAt?.to,
          }}
          setDate={setClosedAt}
        />
      </div>
    </DropdownFilter>
  )
}
