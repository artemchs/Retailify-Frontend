import CashierShifts from '@/api/services/CashierShifts'
import PointsOfSale from '@/api/services/PointsOfSale'
import CreateCashierShiftDialog from '@/features/points-of-sale/cashier-shifts/components/actions/create/CreateCashierShiftDialog'
import FilterCashierShifts from '@/features/points-of-sale/cashier-shifts/components/table/FilterCashierShifts'
import { columns } from '@/features/points-of-sale/cashier-shifts/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { pointOfSaleRoute } from '@/lib/router/routeTree'
import { useParams, useSearch } from '@tanstack/react-router'

export default function PointOfSalePage() {
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
      routeId='/layout/points-of-sale/$pointOfSaleId'
      title={`Смены кассиров на точке продаж "${
        pointOfSale.isLoading
          ? 'Загрузка...'
          : pointOfSale.isError
          ? 'Ошибка :('
          : pointOfSale.data?.name
      }"`}
      topBarElements={
        <>
          <CreateCashierShiftDialog posId={pointOfSaleId} />
          <FilterCashierShifts />
        </>
      }
    />
  )
}
