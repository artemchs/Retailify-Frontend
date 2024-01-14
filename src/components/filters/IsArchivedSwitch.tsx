import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

type Props = {
  setIsArchived(value: number): void
  isArchived: boolean
}

export default function IsArchivedSwitch({ setIsArchived, isArchived }: Props) {
  return (
    <div className='flex items-center space-x-2 p-2'>
      <Switch
        id='is-archived'
        onCheckedChange={(value) => setIsArchived(value === true ? 1 : 0)}
        checked={isArchived}
      />
      <Label htmlFor='is-archived'>Архивированные</Label>
    </div>
  )
}
