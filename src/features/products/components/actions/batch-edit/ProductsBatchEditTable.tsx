import Products from '@/api/services/Products'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ProductsBatchEditTable({ ids }: { ids: string[] }) {
  return (
    <div className='border border-input rounded'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ids.map((id) => (
            <DisplayProductRow key={id} id={id} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function DisplayProductRow({ id }: { id: string }) {
  const { data, isLoading, isError } = Products.useFindOne({ id })

  if (isLoading) return <div className='w-full h-12 animate-pulse bg-muted' />
  if (isError)
    return (
      <div className='w-full h-12 flex items-center justify-center text-destructive'>
        Произошла ошибка
      </div>
    )

  return (
    <TableRow className='h-12'>
      <TableCell>{data?.title}</TableCell>
    </TableRow>
  )
}
