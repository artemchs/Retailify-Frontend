import PointsOfSale from '@/api/services/PointsOfSale'
import CreatePosDialog from '@/features/points-of-sale/components/actions/create/CreatePosDialog'
import FilterPointsOfSale from '@/features/points-of-sale/components/table/FilterPointsOfSale'
import { columns } from '@/features/points-of-sale/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { pointsOfSaleRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function PointsOfSaleListPage() {
  const searchParams = useSearch({
    from: pointsOfSaleRoute.id,
  })

  const { data, isLoading, isError } = PointsOfSale.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/points-of-sale'
      title='Кассы'
      topBarElements={
        <>
          <CreatePosDialog />
          <FilterPointsOfSale />
        </>
      }
    />
  )
}
