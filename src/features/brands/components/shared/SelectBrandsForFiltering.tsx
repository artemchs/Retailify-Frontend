import Brands from '@/api/services/Brands'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Brand } from '@/types/entities/Brand'
import { useState } from 'react'

type Props = {
    ids: string[]
    setIds(ids?: string[]): void
    title?: string
}

export default function SelectBrandsForFiltering({
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
    } = Brands.useFindAll({ query })

    return (
        <DropdownSubItemForFiltering<
            Brand,
            {
                items: Brand[]
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
            title={title ?? 'Бренды'}
        />
    )
}
