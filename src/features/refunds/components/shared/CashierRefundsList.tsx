import Refunds from '@/api/services/Refunds'
import { Error, Loading } from '@/components/forms/CrudComboboxMultiple'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { useScrollToFetchData } from '@/hooks/useScrollToFetchData'
import { debounce } from 'lodash'
import { SearchIcon } from 'lucide-react'
import { Fragment, useCallback, useMemo, useState } from 'react'

export default function CashierRefundsList() {
    const [query, setQuery] = useState('')
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = Refunds.useFindAllInfiniteList({ query })

    const [searchInputValue, setSearchInputValue] = useState('')

    const setQueryValue = useCallback(
        (value: string) => {
            setQuery(value)
        },
        [setQuery]
    )

    const debouncedSetQueryValue = useMemo(() => {
        return debounce(setQueryValue, 300)
    }, [setQueryValue])

    const [observerTarget, setObserverTarget] = useState<HTMLDivElement | null>(
        null
    )
    useScrollToFetchData(
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        observerTarget
    )

    return (
        <div className='flex flex-col gap-4'>
            <div className='w-full relative '>
                <SearchIcon className='h-4 w-4 text-muted-foreground absolute top-0 bottom-0 my-auto left-3 pointer-events-none' />
                <Input
                    type='text'
                    placeholder='Поиск возврат...'
                    className='pl-8 h-10'
                    value={searchInputValue}
                    onChange={({ target: { value } }) => {
                        setSearchInputValue(value)
                        debouncedSetQueryValue(value)
                    }}
                    autoFocus={true}
                />
            </div>
            <div className='flex flex-col gap-2'>
                {status === 'pending' ? (
                    <Loading />
                ) : status === 'error' ? (
                    <Error />
                ) : (
                    <>
                        {data.pages.map(({ items }, i) => (
                            <Fragment key={i}>
                                {items.map(
                                    ({
                                        id,
                                        name,
                                        amount,
                                        createdAt,
                                        order,
                                    }) => (
                                        <Card
                                            key={id}
                                            className='shadow-sm hover:shadow-md transition-all'
                                        >
                                            <CardHeader>
                                                <CardTitle className='flex items-center justify-between'>
                                                    <span>{name}</span>
                                                    <CurrencyFormatter
                                                        value={
                                                            amount
                                                                ? parseFloat(
                                                                      amount
                                                                  )
                                                                : 0
                                                        }
                                                    />
                                                </CardTitle>
                                                <CardDescription className='flex items-center justify-between'>
                                                    <DateFormatter
                                                        date={createdAt}
                                                        withPreciseTime
                                                    />
                                                    <span>
                                                        {order?.customer &&
                                                            `${order?.customer.firstName} ${order?.customer.lastName}`}
                                                    </span>
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    )
                                )}
                            </Fragment>
                        ))}
                        <div
                            ref={(element) => setObserverTarget(element)}
                        ></div>
                        {(isFetching || isFetchingNextPage) && <Loading />}
                    </>
                )}
            </div>
        </div>
    )
}
