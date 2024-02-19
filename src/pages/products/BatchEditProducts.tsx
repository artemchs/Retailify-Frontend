import PageTitle from '@/components/ui/page-title'
import ProductsBatchEditTable from '@/features/products/components/actions/batch-edit/ProductsBatchEditTable'
import { batchEditProductsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function BatchEditProductsPage() {
  const { ids } = useSearch({
    from: batchEditProductsRoute.id,
  })

  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Редактировать выбранные модели товара' />
      {ids && <ProductsBatchEditTable ids={ids} />}
    </div>
  )
}
