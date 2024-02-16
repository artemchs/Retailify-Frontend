import EditGoodsReceiptLink from '../actions/edit/EditGoodsReceiptLink'

export default function GoodsReceiptActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditGoodsReceiptLink id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditGoodsReceiptLink id={id} />
    </div>
  )
}
