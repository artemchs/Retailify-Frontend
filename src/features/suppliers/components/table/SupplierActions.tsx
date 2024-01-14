import { useRouteContext } from '@tanstack/react-router'
import EditSupplierDialog from '../actions/edit/EditSupplierDialog'
import ArchiveSupplierAlertDialog from '../actions/archive/ArchiveSupplierAlertDialog'
import RestoreSupplierAlertDialog from '../actions/restore/RestoreSupplierAlertDialog'

export default function SupplierActions({
  id,
  isArchived,
}: {
  id: string
  isArchived: boolean
}) {
  const { user } = useRouteContext({ from: '/layout/suppliers' })

  if (user?.role !== 'ADMIN') return null

  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditSupplierDialog id={id} />
        <ArchiveSupplierAlertDialog id={id} />
      </div>
    )
  }

  if (isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <RestoreSupplierAlertDialog id={id} />
      </div>
    )
  }
}
