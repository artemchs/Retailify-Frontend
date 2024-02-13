import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Edit } from 'lucide-react'

export default function EditProductLink({ id }: { id: string }) {
  return (
    <Button asChild variant='secondary' size='icon'>
      <Link to='/products/$productId/edit' params={{ productId: id }}>
        <Edit className='h-4 w-4' />
      </Link>
    </Button>
  )
}
