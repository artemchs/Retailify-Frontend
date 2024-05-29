import Orders from '@/api/services/Orders'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode } from 'react'
import { CurrencyFormatter } from '@/components/ui/units'
import CreateRefundDialog from '../../../refunds/components/actions/create/CreateRefundDialog'

type Props = {
    trigger: ReactNode
    id: string
    shiftId?: string
}

export default function CashierOrderDialog({ id, trigger, shiftId }: Props) {
    const { data, isLoading, isError } = Orders.useFindOne({ id })

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>
                        {isLoading ? (
                            <Skeleton className='h-8 w-48' />
                        ) : isError ? (
                            'Ошибка'
                        ) : (
                            data?.name
                        )}
                    </DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <Skeleton className='h-9 w-full' />
                ) : (
                    data &&
                    !isError && (
                        <CreateRefundDialog
                            id={id}
                            data={data}
                            shiftId={shiftId}
                        />
                    )
                )}
                <div className='flex flex-col'>
                    {data?.items.map(
                        ({
                            id,
                            pricePerItemWithDiscount,
                            customDiscount,
                            quantity,
                            vtw,
                        }) => (
                            <div
                                key={id}
                                className='p-2 border-b border-input flex flex-col'
                            >
                                <span>
                                    {vtw?.variant?.product?.title}{' '}
                                    {vtw?.variant?.size}
                                </span>
                                <div className='flex items-center justify-between w-full text-muted-foreground text-sm'>
                                    <div className='flex items-center gap-1'>
                                        <span>{quantity}</span>
                                        x
                                        <CurrencyFormatter
                                            value={
                                                pricePerItemWithDiscount
                                                    ? parseFloat(
                                                          pricePerItemWithDiscount
                                                      )
                                                    : 0
                                            }
                                        />
                                        {customDiscount &&
                                            customDiscount !== '0' && (
                                                <span>
                                                    (без скидки:{' '}
                                                    <CurrencyFormatter
                                                        value={
                                                            parseFloat(
                                                                customDiscount
                                                            ) +
                                                            (pricePerItemWithDiscount
                                                                ? parseFloat(
                                                                      pricePerItemWithDiscount
                                                                  )
                                                                : 0)
                                                        }
                                                    />
                                                    )
                                                </span>
                                            )}
                                    </div>
                                    <CurrencyFormatter
                                        value={
                                            pricePerItemWithDiscount
                                                ? parseFloat(
                                                      pricePerItemWithDiscount
                                                  ) * quantity
                                                : 0
                                        }
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between text-lg font-medium'>
                            <span>Без скидки:</span>
                            {isLoading ? (
                                <Skeleton className='h-6 w-20' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        (data?.invoice?.totalCardAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCardAmount
                                              )
                                            : 0) +
                                        (data?.invoice?.totalCashAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCashAmount
                                              )
                                            : 0) +
                                        (data?.customBulkDiscount
                                            ? parseFloat(
                                                  data.customBulkDiscount
                                              )
                                            : 0) +
                                        (data?.items
                                            ? data.items
                                                  .map(({ customDiscount }) =>
                                                      customDiscount
                                                          ? parseFloat(
                                                                customDiscount
                                                            )
                                                          : 0
                                                  )
                                                  .reduce(
                                                      (prev, curr) =>
                                                          prev + curr
                                                  )
                                            : 0)
                                    }
                                />
                            )}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Персональная скидка на чек:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-14' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        data?.customBulkDiscount
                                            ? parseFloat(
                                                  data.customBulkDiscount
                                              )
                                            : 0
                                    }
                                />
                            )}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Сумма персональных скидок на товар:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-14' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        data?.items
                                            ? data.items
                                                  .map(({ customDiscount }) =>
                                                      customDiscount
                                                          ? parseFloat(
                                                                customDiscount
                                                            )
                                                          : 0
                                                  )
                                                  .reduce(
                                                      (prev, curr) =>
                                                          prev + curr
                                                  )
                                            : 0
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between text-lg font-bold'>
                            <span>Итого:</span>
                            {isLoading ? (
                                <Skeleton className='h-6 w-20' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        (data?.invoice?.totalCardAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCardAmount
                                              )
                                            : 0) +
                                        (data?.invoice?.totalCashAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCashAmount
                                              )
                                            : 0)
                                    }
                                />
                            )}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Наличными:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-14' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        data?.invoice?.totalCashAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCashAmount
                                              )
                                            : 0
                                    }
                                />
                            )}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Безналичными:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-14' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <CurrencyFormatter
                                    value={
                                        data?.invoice?.totalCardAmount
                                            ? parseFloat(
                                                  data?.invoice.totalCardAmount
                                              )
                                            : 0
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Покупатель:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-28' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <span>
                                    {data?.customer
                                        ? `${data.customer.firstName} ${data.customer.lastName}; ${data.customer.phoneNumber}`
                                        : '-'}
                                </span>
                            )}
                        </div>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                            <span>Кассир:</span>
                            {isLoading ? (
                                <Skeleton className='h-4 w-24' />
                            ) : isError ? (
                                '-'
                            ) : (
                                <span>{data?.shift?.cashier?.fullName}</span>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
