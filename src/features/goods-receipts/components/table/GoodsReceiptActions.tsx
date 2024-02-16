import ArchiveGoodsReceiptAlertDialog from '../actions/archive/ArchiveGoodsReceiptAlertDialog'
import EditGoodsReceiptLink from '../actions/edit/EditGoodsReceiptLink'
import RestoreGoodsReceiptAlertDialog from '../actions/restore/RestoreGoodsReceiptAlertDialog'

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
        <ArchiveGoodsReceiptAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditGoodsReceiptLink id={id} />
      <RestoreGoodsReceiptAlertDialog id={id} />
    </div>
  )
}
