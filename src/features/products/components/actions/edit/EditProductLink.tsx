import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Edit } from 'lucide-react'

export default function EditProductLink({ id }: { id: string }) {
  return (
    <Button asChild variant='secondary' size='sm'>
      <Link to='/products/$productId/edit' params={{ productId: id }}>
        <Edit className='h-4 w-4 mr-2' />
        Редактировать
      </Link>
    </Button>
  )
}
