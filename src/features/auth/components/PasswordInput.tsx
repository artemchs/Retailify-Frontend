import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>
  placeholder?: string
}

export default function PasswordInput({ field, placeholder }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='flex items-center gap-1'>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...field}
      />
      <Toggle
        aria-label='Переключить отображение пароля'
        variant='outline'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <Eye className='h-4 w-4' />
        ) : (
          <EyeOff className='h-4 w-4' />
        )}
      </Toggle>
    </div>
  )
}
