import Brands from '@/api/services/Brands'

export default function RenderBrand({ id }: { id: string }) {
  const { data, isLoading, isError } = Brands.useFindOne({ id })

  return <>{data?.name}</>
}
