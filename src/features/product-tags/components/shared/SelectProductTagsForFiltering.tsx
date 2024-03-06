import ProductTags, { ProductTagsFindAll } from '@/api/services/ProductTags'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { ProductTag } from '@/types/entities/ProductTag'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
  title?: string
}

export default function SelectProductTagsForFiltering({
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
  } = ProductTags.useFindAll({ query })

  return (
    <DropdownSubItemForFiltering<ProductTag, ProductTagsFindAll>
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
      title={title ?? 'Теги товара'}
    />
  )
}
