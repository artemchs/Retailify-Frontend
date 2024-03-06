import ArchivePosAlertDialog from "../actions/archive/ArchivePosAlertDialog"
import EditPosDialog from "../actions/edit/EditPosDialog"
import RestorePosAlertDialog from "../actions/restore/RestorePosAlertDialog"

export default function PointOfSaleActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditPosDialog id={id} />
        <ArchivePosAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditPosDialog id={id} />
      <RestorePosAlertDialog id={id} />
    </div>
  )
}
