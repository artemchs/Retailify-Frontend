import ArchiveCategoryGroupAlertDialog from '../actions/archive/ArchiveCategoryGroupAlertDialog'
import EditCategoryGroupDialog from '../actions/edit/EditCategoryGroupDialog'
import RestoreCategoryGroupAlertDialog from '../actions/restore/RestoreCategoryGroupAlertDialog'

export default function CategoryGroupActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditCategoryGroupDialog id={id} />
      {isArchived ? (
        <RestoreCategoryGroupAlertDialog id={id} />
      ) : (
        <ArchiveCategoryGroupAlertDialog id={id} />
      )}
    </div>
  )
}
