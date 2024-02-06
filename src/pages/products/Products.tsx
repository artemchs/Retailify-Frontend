import Products from '@/api/services/Products'
import CreateProductLink from '@/features/products/components/actions/create/CreateProductLink'
import { columns } from '@/features/products/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { productsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function ProductsPage() {
  const searchParams = useSearch({
    from: productsRoute.id,
  })

  const { data, isLoading, isError } = Products.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/products'
      title='Модели товара'
      topBarElements={
        <>
          <CreateProductLink />
        </>
      }
    />
  )
}
