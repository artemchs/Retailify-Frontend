import { routeTree } from '@/lib/router/routeTree'
import { RouteIds, useNavigate, useSearch } from '@tanstack/react-router'
import DropdownOrderBy from '../orderBy/DropdownOrderBy'

type Props = {
  routeId: RouteIds<typeof routeTree>
  label: string
  orderByProperty: string
}

export default function SortableDataTableHeader({
  routeId,
  label,
  orderByProperty,
}: Props) {
  // @ts-expect-error Not all routes have the "orderBy" search param, and it is not intended to use this component in those routes.
  const { orderBy } = useSearch({
    from: routeId,
    strict: false,
  })
  const navigate = useNavigate()

  function setValue(value: 'desc' | 'asc' | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        orderBy: { ...orderBy, [orderByProperty]: value },
      }),
    })
  }

  return (
    <DropdownOrderBy
      label={label}
      value={orderBy?.[orderByProperty]}
      setValue={setValue}
    />
  )
}
