import { Edit } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

export default function EditButton() {
  return (
    <DialogTrigger asChild>
      <Button variant='ghost' size='icon'>
        <Edit className='h-4 w-4' />
      </Button>
    </DialogTrigger>
  )
}
