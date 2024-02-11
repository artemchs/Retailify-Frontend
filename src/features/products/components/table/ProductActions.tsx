import ArchiveProductAlertDialog from '../actions/archive/ArchiveProductAlertDialog'
import EditProductLink from '../actions/edit/EditProductLink'
import RestoreProductAlertDialog from '../actions/restore/RestoreProductAlertDialog'

export default function ProductActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditProductLink id={id} />
        <ArchiveProductAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditProductLink id={id} />
      <RestoreProductAlertDialog id={id} />
    </div>
  )
}
