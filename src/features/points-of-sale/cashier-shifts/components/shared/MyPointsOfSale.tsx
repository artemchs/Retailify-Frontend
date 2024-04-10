import Users from '@/api/services/Users'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@tanstack/react-router'
import { Check, Minus } from 'lucide-react'
import { FaCashRegister } from 'react-icons/fa6'

export default function MyPointsOfSale() {
  const { data, isLoading, isError } = Users.useFindMyPointsOfSale()

  return (
    <div className='flex flex-col gap-2'>
      <h2>Мои точки продаж:</h2>
      {isError ? (
        <span className='text-destructive'>Ошибка</span>
      ) : isLoading ? (
        <div className='flex items-center gap-2'>
          <Skeleton className='h-24 w-40' />
          <Skeleton className='h-24 w-40' />
          <Skeleton className='h-24 w-40' />
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          {data?.map(({ id, name, cashierShifts }) => (
            <div
              key={id}
              className='p-2 border border-input shadow-sm rounded-lg flex flex-col gap-4'
            >
              <div className='flex flex-col gap-1'>
                <h4 className='font-medium'>{name}</h4>
                {cashierShifts?.[0]?.isOpened ? (
                  <Badge
                    variant='outline'
                    className='w-fit border-green-600 text-green-600'
                  >
                    <Check className='h-3 w-3 mr-2' />
                    Открыта
                  </Badge>
                ) : (
                  <Badge variant='outline' className='w-fit'>
                    <Minus className='h-3 w-3 mr-2' />
                    Закрыта
                  </Badge>
                )}
              </div>
              <Button size='sm' variant='secondary' className='w-fit' asChild>
                <Link
                  to='/cash-register'
                  search={{
                    shiftId: cashierShifts?.[0]?.isOpened
                      ? cashierShifts?.[0]?.id
                      : undefined,
                    posId: id,
                    page: 1,
                    rowsPerPage: 20,
                  }}
                >
                  <FaCashRegister className='h-4 w-4 mr-2' />
                  Перейти в кассу
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
