import EditFinancialTransactionDialog from '../actions/edit/EditFinancialTransactionDialog'

export default function FinancialTransactionActions({
    id,
    isManual,
}: {
    id: string
    isManual: boolean
}) {
    if (!isManual) return

    return (
        <div className='flex items-center gap-2 justify-end'>
            <EditFinancialTransactionDialog id={id} />
        </div>
    )
}
