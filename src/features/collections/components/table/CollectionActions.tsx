import ArchiveCollectionAlertDialog from '../actions/archive/ArchiveCollectionAlertDialog'
import EditCollectionDialog from '../actions/edit/EditCollectionDialog'
import RestoreCollectionAlertDialog from '../actions/restore/RestoreCollectionAlertDialog'

type Props = {
  id: string
  isArchived: boolean
}

export default function CollectionActions({ id, isArchived }: Props) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditCollectionDialog id={id} />
        <ArchiveCollectionAlertDialog id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <RestoreCollectionAlertDialog id={id} />
    </div>
  )
}
