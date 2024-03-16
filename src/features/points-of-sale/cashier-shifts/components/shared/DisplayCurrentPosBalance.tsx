import PointsOfSale from '@/api/services/PointsOfSale'
import { Skeleton } from '@/components/ui/skeleton'
import { CurrencyFormatter } from '@/components/ui/units'

export default function DisplayCurrentPosBalance({
  posId,
  addAmount,
}: {
  posId: string
  addAmount: number
}) {
  const { data, isLoading, isError } = PointsOfSale.useFindOne({ id: posId })

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-16 w-full' />
      ) : isError ? (
        <div className='border border-destructive shadow-sm rounded-md flex items-center justify-center p-4 text-destructive'>
          Произошла ошибка...
        </div>
      ) : (
        <div className='flex items-center font-medium text-lg justify-between p-4 rounded-md border border-input shadow-sm'>
          <span>Средства:</span>
          <span>
            <CurrencyFormatter
              value={(data?.balance ? parseFloat(data.balance) : 0) + addAmount}
            />
          </span>
        </div>
      )}
    </>
  )
}
