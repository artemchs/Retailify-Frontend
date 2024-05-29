import Orders from '@/api/services/Orders'
import { columns } from '@/features/orders/components/monitoring/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { ordersRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function OrdersPage() {
    const searchParams = useSearch({
        from: ordersRoute.id,
    })

    const { data, isLoading, isError } = Orders.useFindAll(searchParams)

    return (
        <CrudLayout
            columns={columns}
            data={data}
            isLoading={isLoading}
            isError={isError}
            routeId='/layout/orders'
            title='Заказы и продажи'
            topBarElements={<></>}
        />
    )
}
