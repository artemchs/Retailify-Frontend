import ArchiveProductVariantAlertDialog from '../actions/archive/ArchiveProductVariantAlertDialog'
import EditProductVariantDialog from '../actions/edit/EditProductVariantDialog'
import RestoreProductVariantAlertDialog from '../actions/restore/RestoreProductVariantAlertDialog'

export default function VariantActions({
  id,
  isArchived,
  productId,
}: {
  id: string
  isArchived: boolean
  productId: string
}) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditProductVariantDialog productId={productId} id={id} />
        <ArchiveProductVariantAlertDialog productId={productId} id={id} />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditProductVariantDialog productId={productId} id={id} />
      <RestoreProductVariantAlertDialog productId={productId} id={id} />
    </div>
  )
}
