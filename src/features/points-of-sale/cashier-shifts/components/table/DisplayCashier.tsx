import Employees from '@/api/services/Employees'
import { Skeleton } from '@/components/ui/skeleton'

export default function DisplayCashier({ cashierId }: { cashierId: string }) {
  const { data, isLoading, isError } = Employees.useFindOne({ id: cashierId })

  if (isLoading) return <Skeleton className='h-7 w-36' />
  if (isError) return <span className='text-de'>Ошибка</span>

  return <span>{data?.fullName}</span>
}
