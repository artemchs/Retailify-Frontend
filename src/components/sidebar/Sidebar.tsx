import { Separator } from '@/components/ui/separator'
import SelectOrganization from './SelectOrganization'

export default function Sidebar() {
  return (
    <div className='hidden lg:flex h-full w-96 flex-col border-r'>
      <div className='p-3'>
        <SelectOrganization />
      </div>
      <Separator />
      <div></div>
    </div>
  )
}
