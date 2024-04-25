import Characteristics from '@/api/services/Characteristics'
import AsyncInput from '@/components/forms/AsyncInput'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import CharacteristicValueCombobox from '@/features/characteristics/values/components/shared/CharacteristicValuesCombobox'
import { Minus } from 'lucide-react'
import { useEffect } from 'react'
import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'characteristicValues'>
}

type CharacteristicValue = {
  characteristicId: string
  id: string
}

export default function CharacteristicValuesInput({
  control,
  form,
  field,
}: Props) {
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
        Что-бы заполнить характеристики, сначала выберите категорию.
      </p>
    )

  if (!field.value || field.value.length === 0)
    return (
      <DoesNotHaveAnyValues categoryId={categoryId} field={field} form={form} />
    )

  return <RenderValues field={field} form={form} />
}

function DoesNotHaveAnyValues({
  field,
  form,
  categoryId,
}: Omit<Props, 'control'> & { categoryId: string }) {
  const { data, isLoading, isError } = Characteristics.useFindAllForCategory({
    categoryId,
  })

  useEffect(() => {
    const existingValues = field.value as CharacteristicValue[]

    if (!existingValues || existingValues.length === 0) {
      const values = data?.map(({ id }) => ({
        id: undefined,
        characteristicId: id,
      }))
      form.setValue('characteristicValues', values)
    }
  }, [data, form, field.value])

  if (isLoading) return null
  if (isError) return null

  return <RenderValues field={field} form={form} />
}

function RenderValues({ field, form }: Omit<Props, 'control'>) {
  const values = field.value as CharacteristicValue[]

  return (
    <div className='flex flex-col gap-4'>
      {values.map((characteristicValue) => (
        <RenderValueInput
          key={characteristicValue.characteristicId}
          field={field}
          form={form}
          characteristicValue={characteristicValue}
        />
      ))}
    </div>
  )
}

function RenderValueInput({
  field,
  form,
  characteristicValue: { characteristicId },
}: Omit<Props, 'control'> & { characteristicValue: CharacteristicValue }) {
  const { data, isLoading, isError } = Characteristics.useFindOne({
    id: characteristicId,
  })

  if (isLoading) return null
  if (isError) return null

  return (
    <div className='flex flex-col gap-2'>
      <Label>
        {isError ? 'Загрузка...' : isError ? 'Ошибка' : `${data?.name}:`}
      </Label>
      <div className='flex items-center gap-2'>
        <AsyncInput
          input={
            <CharacteristicValueCombobox
              characteristicId={characteristicId}
              field={field}
              form={form}
            />
          }
          isLoading={isLoading}
          isError={isError}
        />
        <Button
          variant='secondary'
          type='button'
          onClick={() =>
            form.setValue(
              'characteristicValues',
              (field.value as CharacteristicValue[]).filter(
                (obj) => obj.characteristicId !== characteristicId
              )
            )
          }
        >
          <Minus className='h-4 w-4 mr-2' />
          Убрать
        </Button>
      </div>
    </div>
  )
}
