import { useRouteContext } from '@tanstack/react-router'
import EditEmployeeDialog from '../components/edit/EditEmployeeDialog'
import DeleteEmployeeAlertDialog from '../components/delete/DeleteEmployeeAlertDialog'

export default function EmployeesActions({ id }: { id: string }) {
  const context = useRouteContext({ from: '/layout/employees' })

  if (id === context.user?.sub) return null

  return (
    <div className='flex items-center gap-2 justify-end'>
      <EditEmployeeDialog id={id} />
      <DeleteEmployeeAlertDialog id={id} />
    </div>
  )
}
