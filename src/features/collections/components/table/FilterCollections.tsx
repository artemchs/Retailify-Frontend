import DropdownFilter from '@/components/filters/DropdownFilter'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import { collectionsRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function FilterCollections() {
  const { isArchived } = useSearch({
    from: collectionsRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (isArchived) {
      number += 1
    }

    return number
  }

  function setIsArchived(value: number) {
    navigate({
      search: (prev) => ({ ...prev, isArchived: value }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({ ...prev, isArchived: 0 }),
    })
  }

  return (
    <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
      <IsArchivedSwitch
        setIsArchived={setIsArchived}
        isArchived={isArchived ? Boolean(isArchived) : false}
      />
    </DropdownFilter>
  )
}
