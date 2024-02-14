import PageTitle from '@/components/ui/page-title'
import CreateGoodsReceiptForm from '@/features/goods-receipts/components/actions/create/CreateGoodsReceiptForm'

export default function CreateGoodsReceiptPage() {
  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Добавить новую накладную прихода товара' />
      <CreateGoodsReceiptForm />
    </div>
  )
}
