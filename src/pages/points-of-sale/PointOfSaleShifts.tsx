import CashierShifts from '@/api/services/CashierShifts'
import PointsOfSale from '@/api/services/PointsOfSale'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import CreateCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/create/CreateCashierShiftDialog'
import FilterCashierShifts from '@/features/points-of-sale/cashier-shifts/components/table/FilterCashierShifts'
import { columns } from '@/features/points-of-sale/cashier-shifts/components/table/columns'
import LogInCashRegister from '@/features/points-of-sale/components/shared/LogInCashRegister'
import CrudLayout from '@/layouts/CrudLayout'
import { pointOfSaleRoute } from '@/lib/router/routeTree'
import { useParams, useSearch } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export default function PointOfSaleShiftsPage() {
  const searchParams = useSearch({
    from: pointOfSaleRoute.id,
  })

  const { pointOfSaleId } = useParams({
    from: pointOfSaleRoute.id,
  })

  const pointOfSale = PointsOfSale.useFindOne({ id: pointOfSaleId })

  const { data, isLoading, isError } = CashierShifts.useFindAll(
    searchParams,
    pointOfSaleId
  )

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/points-of-sale/$pointOfSaleId/shifts'
      title={`Смены кассиров на точке продаж "${
        pointOfSale.isLoading
          ? 'Загрузка...'
          : pointOfSale.isError
          ? 'Ошибка :('
          : pointOfSale.data?.name
      }"`}
      topBarElements={
        <>
          <CreateCashierShiftDialog
            posId={pointOfSaleId}
            trigger={
              <DialogTrigger asChild>
                <Button>
                  <Plus className='h-4 w-4 mr-2' />
                  Открыть
                </Button>
              </DialogTrigger>
            }
          />
          <LogInCashRegister posId={pointOfSaleId} />
          <FilterCashierShifts />
        </>
      }
    />
  )
}
