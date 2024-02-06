import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export default function CreateProductLink() {
  return (
    <Button asChild>
      <Link to='/products/create'>
        <Plus className='h-4 w-4 mr-2' />
        Добавить модель
      </Link>
    </Button>
  )
}
