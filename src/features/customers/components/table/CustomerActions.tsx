import EditCustomerDialog from '../actions/edit/EditCustomerDialog'
import RemoveCustomerAlertDialog from '../actions/remove/RemoveCustomerAlertDialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import EditButton from '@/components/data-tables/EditButton'

export default function CustomerActions({ id }: { id: string }) {
  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditCustomerDialog id={id} trigger={<EditButton />} />
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
