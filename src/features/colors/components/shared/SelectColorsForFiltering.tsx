import Colors from '@/api/services/Colors'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Color } from '@/types/entities/Color'
import { useState } from 'react'

type Props = {
    ids: string[]
    setIds(ids?: string[]): void
    title?: string
}

export default function SelectColorsForFiltering({
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
    } = Colors.useFindAll({ query })

    return (
        <DropdownSubItemForFiltering<
            Color,
            {
                items: Color[]
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
            title={title ?? 'Цвета'}
        />
    )
}
