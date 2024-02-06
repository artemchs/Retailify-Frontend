import PageTitle from '@/components/ui/page-title'
import CreateProductForm from '@/features/products/components/actions/create/CreateProductForm'

export default function CreateProductPage() {
  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Добавить новую модель товара' />
      <CreateProductForm />
    </div>
  )
}
