import GoodsReceipts from '@/api/services/GoodsReceipts'
import { ErrorPage, LoadingPage } from '@/components/ui/async-page'
import PageTitle from '@/components/ui/page-title'
import EditGoodsReceiptForm from '@/features/goods-receipts/components/actions/edit/EditGoodsReceiptForm'
import { editGoodsReceiptRoute } from '@/lib/router/routeTree'
import { useParams } from '@tanstack/react-router'

export default function EditGoodsReceiptPage() {
  const { goodsReceiptId } = useParams({
    from: editGoodsReceiptRoute.id,
  })

  const { data, isLoading, isError } = GoodsReceipts.useFindOne({
    id: goodsReceiptId,
  })

  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Редактировать накладную прихода товара' />
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <EditGoodsReceiptForm
          goodsReceiptId={goodsReceiptId}
          goodsReceipt={data}
        />
      )}
    </div>
  )
}
