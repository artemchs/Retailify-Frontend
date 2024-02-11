import EditProductLink from '../actions/edit/EditProductLink'

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
      </div>
    )
  }

  return <div className='flex items-center gap-2 justify-end'></div>
}
