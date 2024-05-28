import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditButton from '@/components/data-tables/EditButton'
import FinancialTransactions from '@/api/services/FinancialTransactions'
import EditFinancialTransactionForm from './EditFinancialTransactionForm'

export default function EditFinancialTransactionDialog({ id }: { id: string }) {
    const [isOpened, setIsOpened] = useState(false)
    const { data, isLoading, isError } = FinancialTransactions.useFindOne({
        id,
    })

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <EditButton />
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Создать новую финансовую операцию</DialogTitle>
                </DialogHeader>
                <EditFinancialTransactionForm
                    data={data ?? undefined}
                    isError={isError}
                    isLoading={isLoading}
                    setIsOpened={setIsOpened}
                    id={id}
                />
            </DialogContent>
        </Dialog>
    )
}
