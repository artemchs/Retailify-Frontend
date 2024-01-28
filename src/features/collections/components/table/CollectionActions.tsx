import EditCollectionDialog from '../actions/edit/EditCollectionDialog'

type Props = {
  id: string
  isArchived: boolean
}

export default function CollectionActions({ id, isArchived }: Props) {
  if (!isArchived) {
    return (
      <div className='flex items-center gap-2 justify-end'>
        <EditCollectionDialog id={id} />
      </div>
    )
  }
}
