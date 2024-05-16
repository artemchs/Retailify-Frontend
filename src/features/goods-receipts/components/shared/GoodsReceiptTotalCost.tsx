import { UseFormReturn, useWatch } from 'react-hook-form'
import { GoodsReceiptVariant } from '../../types/create-goods-receipt-form-schema'
import { useCallback } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Suppliers from '@/api/services/Suppliers'
import { CurrencyFormatter } from '@/components/ui/units'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any, any, undefined>
}

export default function GoodsReceiptTotalCost({ form }: Props) {
    const [variants, amountPaid, supplierId] = useWatch({
        control: form.control,
        name: ['variants', 'amountPaid', 'supplierId'],
    })

    const supplier = Suppliers.useFindOne({ id: supplierId ?? null })

    const calculateTotalVariants = useCallback(() => {
        const vars = variants as GoodsReceiptVariant[]

        let sum = 0

        for (let i = 0; i < vars.length; i++) {
            const { receivedQuantity, supplierPrice } = vars[i]

            if (receivedQuantity && supplierPrice) {
                sum += receivedQuantity * supplierPrice
            }
        }

        return sum
    }, [variants])

    const calculateSupplierOutstandingBalanceForReceipt = useCallback(() => {
        const paid = (amountPaid ?? 0) as number
        const total = calculateTotalVariants()

        return total - paid
    }, [amountPaid, calculateTotalVariants])

    const handleAmountPaidInputChange = (value: number) => {
        form.setValue('amountPaid', value)
    }

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-medium'>Финансовый итог:</h3>
            <div className='border border-input rounded-md'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead className='text-right'>Сумма</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Сумма товаров</TableCell>
                            <TableCell className='text-right'>
                                <CurrencyFormatter
                                    value={calculateTotalVariants()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Долг поставщику за этот приход
                            </TableCell>
                            <TableCell className='text-right'>
                                <CurrencyFormatter
                                    value={calculateSupplierOutstandingBalanceForReceipt()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Долг поставщику общий</TableCell>
                            <TableCell className='text-right'>
                                {supplier &&
                                    (supplier.isLoading ? (
                                        <Skeleton className='h-4 w-16' />
                                    ) : supplier.isError ? (
                                        <span className='text-destructive'>
                                            {!supplierId
                                                ? 'Выберите поставщика для прихода'
                                                : 'Ошибка'}
                                        </span>
                                    ) : (
                                        supplier.data && (
                                            <CurrencyFormatter
                                                value={
                                                    (supplier.data
                                                        .totalOutstandingBalance
                                                        ? parseFloat(
                                                              supplier.data
                                                                  .totalOutstandingBalance
                                                          )
                                                        : 0) +
                                                    calculateSupplierOutstandingBalanceForReceipt()
                                                }
                                            />
                                        )
                                    ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>Сумма оплаты поставщику</TableCell>
                            <TableCell>
                                <Input
                                    type='number'
                                    value={amountPaid}
                                    onChange={(e) =>
                                        handleAmountPaidInputChange(
                                            e.target.valueAsNumber ?? 0
                                        )
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}
