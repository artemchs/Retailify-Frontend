import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import CategoryGroups from '@/api/services/CategoryGroups'
import { CategoryGroup } from '@/types/entities/CategoryGroup'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'categoryGroups'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CategoryGroupsComboboxMultiple({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = CategoryGroups.useFindAllInfiniteList({ query })

  const selectedValues = field.value as CategoryGroup[]
  const setSelectedValues = (newValues: CategoryGroup[]) => {
    form.setValue('categoryGroups', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'categoryGroups',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<
      CategoryGroup,
      {
        items: CategoryGroup[]
        nextCursor?: string
      }
    >
      placeholder='Выберите группы категорий'
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setQuery={setQuery}
      idField='id'
      nameField='name'
      itemsField='items'
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
