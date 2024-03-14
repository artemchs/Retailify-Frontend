import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { Input } from '../ui/input'
import { AsYouType } from 'libphonenumber-js'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  placeholder?: string
  fieldName?: string
}

export default function PhoneNumberInput({
  field,
  placeholder,
  form,
  fieldName,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      fieldName ?? 'phone',
      new AsYouType('UA').input(e.target.value)
    )
  }

  return (
    <Input
      {...field}
      placeholder={placeholder}
      onChange={handleChange}
      type='tel'
    />
  )
}
