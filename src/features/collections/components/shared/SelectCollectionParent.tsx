import Collections from '@/api/services/Collections'
import ComboboxSelectSingle from '@/components/forms/ComboboxSelectSingle'
import { Collection } from '@/types/entities/Collection'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'parentId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function SelectCollectionParent({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Collections.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('parentId', id)
  }

  const selectedCollection = Collections.useFindOne({ id: selectedValue })

  return (
    <ComboboxSelectSingle<
      Collection,
      { items: Collection[]; nextCursor?: string }
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
      placeholder='Выберите родительскую коллекцию'
      selectedEntity={selectedCollection}
    />
  )
}
