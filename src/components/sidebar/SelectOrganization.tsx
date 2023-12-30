import * as React from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

export default function SelectOrganization() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          Выберите организацию...
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
