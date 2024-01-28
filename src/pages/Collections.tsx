import Collections from '@/api/services/Collections'
import CreateCollectionDialog from '@/features/collections/components/actions/create/CreateCollectionDialog'
import FilterCollections from '@/features/collections/components/table/FilterCollections'
import { columns } from '@/features/collections/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { collectionsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function CollectionsPage() {
  const searchParams = useSearch({
    from: collectionsRoute.id,
  })

  const { data, isLoading, isError } = Collections.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/collections'
      title='Коллекции товара'
      topBarElements={
        <>
          <CreateCollectionDialog />
          <FilterCollections />
        </>
      }
    />
  )
}
