import CategoryGroups from '@/api/services/CategoryGroups'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { CategoryGroup } from '@/types/entities/CategoryGroup'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
  title?: string
}

export default function SelectCategoryGroupsForFiltering({
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
  } = CategoryGroups.useFindAllInfiniteList({ query })

  return (
    <DropdownSubItemForFiltering<
      CategoryGroup,
      {
        items: CategoryGroup[]
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
      title={title ?? 'Группы категорий'}
    />
  )
}
