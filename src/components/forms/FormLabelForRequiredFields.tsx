import { FormLabel } from '@/components/ui/form'

type Props = {
  text: string
}

export default function FormLabelForRequiredFields({ text }: Props) {
  return (
    <FormLabel>
      {text}: <span className='text-destructive text-sm'>*</span>
    </FormLabel>
  )
}
