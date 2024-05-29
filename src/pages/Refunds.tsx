import Refunds from '@/api/services/Refunds'
import { columns } from '@/features/refunds/components/shared/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { refundsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function RefundsPage() {
    const searchParams = useSearch({
        from: refundsRoute.id,
    })

    const { data, isLoading, isError } = Refunds.useFindAll(searchParams)

    return (
        <CrudLayout
            columns={columns}
            data={data}
            isLoading={isLoading}
            isError={isError}
            routeId='/layout/refunds'
            title='Возвраты'
            topBarElements={<></>}
        />
    )
}
