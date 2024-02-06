import Categories from '@/api/services/Categories'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { Category } from '@/types/entities/Category'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'categoryId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CategoriesCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Categories.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('categoryId', id)
  }

  const selectedCategoryGroup = Categories.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<Category, { items: Category[]; nextCursor?: string }>
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
