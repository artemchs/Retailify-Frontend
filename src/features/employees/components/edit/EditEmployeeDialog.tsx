import Employees from '@/api/services/Employees'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import EditEmployeeForm from './EditEmployeeForm'
import EditButton from '@/components/data-tables/EditButton'

export default function EditEmployeeDialog({ id }: { id: string }) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Employees.useFindOne({ id })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <EditButton />
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
        </DialogHeader>
        <EditEmployeeForm
          setIsOpened={setIsOpened}
          user={data}
          employeeId={id}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  )
}
