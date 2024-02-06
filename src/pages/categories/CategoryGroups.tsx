import CategoryGroups from '@/api/services/CategoryGroups'
import CreateCategoryGroupDialog from '@/features/category-groups/components/actions/create/CreateCategoryGroupDialog'
import FilterCategoryGroups from '@/features/category-groups/components/table/FilterCategoryGroups'
import { columns } from '@/features/category-groups/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { categoryGroupsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function CategoryGroupsPage() {
  const searchParams = useSearch({
    from: categoryGroupsRoute.id,
  })

  const { data, isLoading, isError } = CategoryGroups.useFindAll(searchParams)

  return (
    <CrudLayout
      data={data}
      columns={columns}
      routeId='/layout/category-groups'
      isLoading={isLoading}
      isError={isError}
      title='Группы категорий товара'
      topBarElements={
        <>
          <CreateCategoryGroupDialog />
          <FilterCategoryGroups />
        </>
      }
    />
  )
}
