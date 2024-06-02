import Categories from '@/api/services/Categories'
import Characteristics from '@/api/services/Characteristics'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Category } from '@/types/entities/Category'
import { CharacteristicValue } from '@/types/entities/Characteristic'
import { useState } from 'react'

type Props = {
    ids: string[]
    setIds(ids?: string[]): void
    title?: string
}

export default function SelectCharacteristicValuesForFiltering({
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
    } = Characteristics.useFindAllValues(undefined, { query })

    return (
        <DropdownSubItemForFiltering<
            CharacteristicValue,
            {
                items: CharacteristicValue[]
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
            nameField='value'
            setIds={setIds}
            setQuery={setQuery}
            status={status}
            title={title ?? 'Значения характеристик'}
        />
    )
}
