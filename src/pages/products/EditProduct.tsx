import Products from '@/api/services/Products'
import { ErrorPage, LoadingPage } from '@/components/ui/async-page'
import PageTitle from '@/components/ui/page-title'
import EditProductForm from '@/features/products/components/actions/edit/EditProductForm'
import { editProductRoute } from '@/lib/router/routeTree'
import { useParams } from '@tanstack/react-router'

export default function EditProductPage() {
  const { productId } = useParams({
    from: editProductRoute.id,
  })

  const { data, isLoading, isError } = Products.useFindOne({ id: productId })

  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Редактировать  модель товара' />
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <EditProductForm productId={productId} product={data ?? undefined} />
      )}
    </div>
  )
}
