import ArchiveInventoryTransferAlertDialog from '../actions/archive/ArchiveInventoryTransferAlertDialog'
import EditInventoryTransferDialog from '../actions/edit/EditInventoryTransferDialog'
import RestoreInventoryTransferAlertDialog from '../actions/restore/RestoreInventoryTransferAlertDialog'

export default function InventoryTransferActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditInventoryTransferDialog id={id} />
        <ArchiveInventoryTransferAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditInventoryTransferDialog id={id} />
      <RestoreInventoryTransferAlertDialog id={id} />
    </div>
  )
}
