import Orders from '@/api/services/Orders'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Undo2 } from 'lucide-react'
import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CurrencyFormatter } from '@/components/ui/units'

type Props = {
  trigger: ReactNode
  id: string
}

export default function CashierOrderDialog({ id, trigger }: Props) {
  const { data, isLoading, isError } = Orders.useFindOne({ id })

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
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
        <Button type='button'>
          <Undo2 className='h-4 w-4 mr-2' />
          Создать возврат
        </Button>
        <div className='flex flex-col'>
          {data?.items.map(
            ({
              id,
              pricePerItemWithDiscount,
              customDiscount,
              quantity,
              vtw,
            }) => (
              <div key={id} className='p-2 border-b border-input flex flex-col'>
                <span>
                  {vtw?.variant?.product?.title} - {vtw?.variant?.size}
                </span>
                <div className='flex items-center justify-between w-full text-muted-foreground text-sm'>
                  <div className='flex items-center gap-1'>
                    <span>{quantity}</span>
                    x
                    <CurrencyFormatter
                      value={
                        pricePerItemWithDiscount
                          ? parseFloat(pricePerItemWithDiscount)
                          : 0
                      }
                    />
                    {customDiscount && (
                      <span>
                        (без скидки:{' '}
                        <CurrencyFormatter
                          value={
                            parseFloat(customDiscount) +
                            (pricePerItemWithDiscount
                              ? parseFloat(pricePerItemWithDiscount)
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
                        ? parseFloat(pricePerItemWithDiscount) * quantity
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
              <CurrencyFormatter
                value={
                  (data?.invoice?.totalCardAmount
                    ? parseFloat(data?.invoice.totalCardAmount)
                    : 0) +
                  (data?.invoice?.totalCashAmount
                    ? parseFloat(data?.invoice.totalCashAmount)
                    : 0) +
                  (data?.customBulkDiscount
                    ? parseFloat(data.customBulkDiscount)
                    : 0) +
                  (data?.items
                    ? data.items
                        .map(({ customDiscount }) =>
                          customDiscount ? parseFloat(customDiscount) : 0
                        )
                        .reduce((prev, curr) => prev + curr)
                    : 0)
                }
              />
            </div>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Скидка на чек:</span>
              <CurrencyFormatter
                value={
                  data?.customBulkDiscount
                    ? parseFloat(data.customBulkDiscount)
                    : 0
                }
              />
            </div>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Сумма скидок на товар:</span>
              <CurrencyFormatter
                value={
                  data?.items
                    ? data.items
                        .map(({ customDiscount }) =>
                          customDiscount ? parseFloat(customDiscount) : 0
                        )
                        .reduce((prev, curr) => prev + curr)
                    : 0
                }
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between text-lg font-bold'>
              <span>Итого:</span>
              <CurrencyFormatter
                value={
                  (data?.invoice?.totalCardAmount
                    ? parseFloat(data?.invoice.totalCardAmount)
                    : 0) +
                  (data?.invoice?.totalCashAmount
                    ? parseFloat(data?.invoice.totalCashAmount)
                    : 0)
                }
              />
            </div>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Наличными:</span>
              <CurrencyFormatter
                value={
                  data?.invoice?.totalCashAmount
                    ? parseFloat(data?.invoice.totalCashAmount)
                    : 0
                }
              />
            </div>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Безналичными:</span>
              <CurrencyFormatter
                value={
                  data?.invoice?.totalCardAmount
                    ? parseFloat(data?.invoice.totalCardAmount)
                    : 0
                }
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Покупатель:</span>
              <span>
                {data?.customer
                  ? `${data.customer.firstName} ${data.customer.lastName}; ${data.customer.phoneNumber}`
                  : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Кассир:</span>
              <span>{data?.shift?.cashier?.fullName}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
