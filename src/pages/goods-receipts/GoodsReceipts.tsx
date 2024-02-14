import GoodsReceipts from '@/api/services/GoodsReceipts'
import CreateGoodsReceiptLink from '@/features/goods-receipts/components/actions/create/CreateGoodsReceiptLink'
import { columns } from '@/features/goods-receipts/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { goodsReceiptsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function GoodsReceiptsPage() {
  const searchParams = useSearch({
    from: goodsReceiptsRoute.id,
  })

  const { data, isLoading, isError } = GoodsReceipts.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/goods-receipts'
      title='Приход товара'
      topBarElements={
        <>
          <CreateGoodsReceiptLink />
        </>
      }
    />
  )
}
