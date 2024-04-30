import { Archive } from 'lucide-react'
import { AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'

export default function ArchiveButton() {
  return (
    <AlertDialogTrigger asChild>
      <Button size='icon' variant='outline'>
        <Archive className='h-4 w-4' />
      </Button>
    </AlertDialogTrigger>
  )
}
