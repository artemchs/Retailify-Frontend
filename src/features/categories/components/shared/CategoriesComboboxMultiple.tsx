import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import Categories from '@/api/services/Categories'
import { Category } from '@/types/entities/Category'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'categories'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CategoriesComboboxMultiple({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Categories.useFindAllInfiniteList({ query })

  const selectedValues = field.value as Category[]
  const setSelectedValues = (newValues: Category[]) => {
    form.setValue('categories', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'categories',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<
      Category,
      {
        items: Category[]
        nextCursor?: string
      }
    >
      placeholder='Выберите категории'
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
