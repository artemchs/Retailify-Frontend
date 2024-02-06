import Categories from '@/api/services/Categories'
import CreateCategoryDialog from '@/features/categories/components/actions/create/CreateCategoryDialog'
import FilterCategories from '@/features/categories/components/table/FilterCategories'
import { columns } from '@/features/categories/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { categoriesRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function CategoriesPage() {
  const searchParams = useSearch({
    from: categoriesRoute.id,
  })

  const { data, isLoading, isError } = Categories.useFindAll(searchParams)

  return (
    <CrudLayout
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/categories'
      title='Категории товара'
      columns={columns}
      topBarElements={
        <>
          <CreateCategoryDialog />
          <FilterCategories />
        </>
      }
    />
  )
}
