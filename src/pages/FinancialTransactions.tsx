import FinancialTransactions from '@/api/services/FinancialTransactions'
import CreateFinancialTransactionDialog from '@/features/financial-transactions/components/actions/create/CreateFinancialTransactionDialog'
import FilterFinancialTransactions from '@/features/financial-transactions/components/table/FilterFinancialTransactions'
import { columns } from '@/features/financial-transactions/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { financialTransactionsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function FinancialTransactionsPage() {
    const searchParams = useSearch({
        from: financialTransactionsRoute.id,
    })

    const { data, isLoading, isError } =
        FinancialTransactions.useFindAll(searchParams)

    return (
        <CrudLayout
            columns={columns}
            data={data}
            isLoading={isLoading}
            isError={isError}
            routeId='/layout/financial-transactions'
            title='Финансовые операции'
            topBarElements={
                <>
                    <CreateFinancialTransactionDialog />
                    <FilterFinancialTransactions />
                </>
            }
        />
    )
}
