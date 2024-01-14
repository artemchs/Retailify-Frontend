import ComboboxSubItemForArrayValues from '@/components/filters/ComboboxSubItemForArrayValues'
import DropdownFilter from '@/components/filters/DropdownFilter'
import { employeesRoute } from '@/lib/router/routeTree'
import { FilterOptions } from '@/types/FilterOptions'
import roleNames from '@/utils/roleNames'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function FilterEmployees() {
  const roleOptions: FilterOptions = Object.entries(roleNames)
    .map(([value, label]) => ({
      label,
      value,
    }))
    .filter((obj) => obj.value !== 'ADMIN')

  const { roles } = useSearch({
    from: employeesRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (roles && roles.length >= 1) {
      number += 1
    }

    return number
  }

  function setRoleValues(values: string[]) {
    navigate({
      search: (prev) => ({ ...prev, roles: values }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({ ...prev, roles: undefined }),
    })
  }

  return (
    <div className='flex items-center gap-2'>
      <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
        <ComboboxSubItemForArrayValues
          title='Роль'
          options={roleOptions}
          values={roles ?? []}
          setValues={setRoleValues}
        />
      </DropdownFilter>
    </div>
  )
}
