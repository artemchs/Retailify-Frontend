import ArchiveCategoryAlertDialog from '../actions/archive/ArchiveCategoryAlertDialog'
import EditCategoryDialog from '../actions/edit/EditCategoryDialog'
import RestoreCategoryAlertDialog from '../actions/restore/RestoreCategoryAlertDialog'

export default function CategoryActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditCategoryDialog id={id} />
      {isArchived ? (
        <RestoreCategoryAlertDialog id={id} />
      ) : (
        <ArchiveCategoryAlertDialog id={id} />
      )}
    </div>
  )
}
