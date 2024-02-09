import { useEffect } from 'react'
import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import DisplaySelectedCharacteristicValues from './DisplaySelectedCharacteristicValues'
import SetDefaultCharacteristics from './SetDefaultCharacteristics'
import CharacteristicsComboboxState from '@/features/characteristics/components/shared/CharacteristicsComboboxState'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'characteristicValues'>
}

export type CharacteristicValue = {
  characteristicId: string
  id?: string
}

export default function CharacteristicsInput({ control, field, form }: Props) {
  const categoryId = useWatch({
    control,
    name: 'categoryId',
  })

  useEffect(() => {
    if (categoryId) {
      form.setValue('characteristicValues', [])
    }
  }, [categoryId, form])

  if (!categoryId)
    return (
      <p className='text-muted-foreground'>
        Вам надо сначала выбрать категорию, что-бы выбрать характеристики.
      </p>
    )

  const values = field.value as CharacteristicValue[]
  function setValues(newValues: CharacteristicValue[]) {
    form.setValue('characteristicValues', newValues)
  }

  return (
    <div className='flex flex-col gap-2'>
      <CharacteristicsComboboxState setValues={setValues} values={values} />
      <DisplaySelectedCharacteristicValues
        setValues={setValues}
        values={values}
        field={field}
        form={form}
      />
      <div className='flex flex-col lg:flex-row gap-2'>
        <SetDefaultCharacteristics
          setValues={setValues}
          categoryId={categoryId}
        />
      </div>
    </div>
  )
}
