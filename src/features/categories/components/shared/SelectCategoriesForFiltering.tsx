import Categories from '@/api/services/Categories'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Category } from '@/types/entities/Category'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
  title?: string
}

export default function SelectCategoriesForFiltering({
  ids,
  setIds,
  title,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Categories.useFindAllInfiniteList({ query })

  return (
    <DropdownSubItemForFiltering<
      Category,
      {
        items: Category[]
        nextCursor?: string
      }
    >
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      idField='id'
      ids={ids}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      itemsField='items'
      nameField='name'
      setIds={setIds}
      setQuery={setQuery}
      status={status}
      title={title ?? 'Категории'}
    />
  )
}
