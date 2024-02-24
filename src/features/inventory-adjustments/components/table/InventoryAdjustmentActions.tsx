import ArchiveInventoryAdjustmentAlertDialog from '../actions/archive/ArchiveInventoryAdjustmentAlertDialog'
import EditInventoryAdjustmentDialog from '../actions/edit/EditInventoryAdjustmentDialog'

export default function InventoryAdjustmentActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditInventoryAdjustmentDialog id={id} />
        <ArchiveInventoryAdjustmentAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditInventoryAdjustmentDialog id={id} />
    </div>
  )
}
