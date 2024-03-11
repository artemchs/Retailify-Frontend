import { DialogTrigger } from '@/components/ui/dialog'
import EditCustomerDialog from '../actions/edit/EditCustomerDialog'
import RemoveCustomerAlertDialog from '../actions/remove/RemoveCustomerAlertDialog'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'

export default function CustomerActions({ id }: { id: string }) {
  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditCustomerDialog
        id={id}
        trigger={
          <DialogTrigger asChild>
            <Button variant='secondary' size='icon'>
              <Edit className='h-4 w-4' />
            </Button>
          </DialogTrigger>
        }
      />
      <RemoveCustomerAlertDialog
        id={id}
        trigger={
          <AlertDialogTrigger asChild>
            <Button variant='destructive' size='icon'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </AlertDialogTrigger>
        }
      />
    </div>
  )
}
