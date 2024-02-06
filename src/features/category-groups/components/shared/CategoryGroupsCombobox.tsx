import CategoryGroups from '@/api/services/CategoryGroups'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { CategoryGroup } from '@/types/entities/CategoryGroup'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'groupId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CategoryGroupsCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = CategoryGroups.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('groupId', id)
  }

  const selectedCategoryGroup = CategoryGroups.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<
      CategoryGroup,
      { items: CategoryGroup[]; nextCursor?: string }
    >
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setSelectedValue={setSelectedValue}
      selectedValue={selectedValue}
      itemsField='items'
      nameField='name'
      idField='id'
      setQuery={setQuery}
      placeholder='Выберите группу категорий'
      selectedEntity={selectedCategoryGroup}
    />
  )
}
