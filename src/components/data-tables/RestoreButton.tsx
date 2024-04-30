import { ArchiveRestore } from 'lucide-react'
import { AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'

export default function RestoreButton() {
  return (
    <AlertDialogTrigger asChild>
      <Button size='icon' variant='outline'>
        <ArchiveRestore className='h-4 w-4' />
      </Button>
    </AlertDialogTrigger>
  )
}
