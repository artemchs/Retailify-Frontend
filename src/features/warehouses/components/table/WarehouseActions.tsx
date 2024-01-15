import ArchiveWarehouseAlertDialog from '../actions/archive/ArchiveWarehouseAlertDialog'
import EditWarehouseDialog from '../actions/edit/EditWarehouseDialog'
import RestoreWarehouseAlertDialog from '../actions/restore/RestoreWarehouseAlertDialog'

export default function WarehouseActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditWarehouseDialog id={id} />
        <ArchiveWarehouseAlertDialog id={id} />
      </div>
    )
  }

  if (isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <RestoreWarehouseAlertDialog id={id} />
      </div>
    )
  }
}
