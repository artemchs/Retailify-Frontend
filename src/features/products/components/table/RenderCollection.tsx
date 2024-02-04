import Collections from '@/api/services/Collections'

export default function RenderCollection({ id }: { id: string }) {
  const { data, isLoading, isError } = Collections.useFindOne({ id })

  return <>{data?.name}</>
}
