import { v4 as uuid } from 'uuid'
import { Grip, UploadCloud, X } from 'lucide-react'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import Storage from '@/api/services/Storage'
import {
  DisplayErrorFile,
  DisplayLoadingFile,
  DisplayUploadedFile,
} from './DisplayUploadedFile'
import { Button } from '@/components/ui/button'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'media'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

type UploadedMedia = {
  id: string
  index: number
}

type UploadingStatus = 'idle' | 'uploading' | 'error'

const MAX_FILE_SIZE = 1024 * 1024 * 100
const ACCEPTED_FILE_TYPES = ['image/jpg', 'image/png', 'image/jpeg']

export default function UploadMediaInput({ field, form }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const inputRef = useRef<HTMLInputElement | null>(null)
  const uploadMutation = Storage.useUpload()

  const values = field.value as UploadedMedia[]
  const [uploadStates, setUploadStates] = useState<{
    [key: string]: UploadingStatus
  }>({})

  const setValues = useCallback(
    (newValues: UploadedMedia[]) => {
      form.setValue('media', newValues)
    },
    [form]
  )

  function validateFile(file: File) {
    return MAX_FILE_SIZE >= file.size && ACCEPTED_FILE_TYPES.includes(file.type)
  }

  async function selectFile(file: File) {
    const key = `products/${uuid()}`
    setUploadStates((prevStates) => ({ ...prevStates, [key]: 'uploading' }))
    const newArray = [...values]
    newArray.push({
      id: key,
      index: newArray.length,
    })
    setValues(newArray)

    try {
      await uploadMutation.mutateAsync({ file, key })
      setUploadStates((prevStates) => ({ ...prevStates, [key]: 'idle' }))
    } catch (error) {
      setUploadStates((prevStates) => ({ ...prevStates, [key]: 'error' }))
      console.error('Error uploading file:', error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length >= 1) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files?.[i]
        if (!file) return null
        if (!validateFile(file)) return null

        selectFile(file)
      }
    }
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (active.id !== over?.id) {
        const oldIndex = values.findIndex((v) => v.id === active.id)
        const newIndex = values.findIndex((v) => v.id === over?.id)
        const newArray = arrayMove<UploadedMedia>(values, oldIndex, newIndex)
        newArray[newIndex].index = newIndex
        newArray[oldIndex].index = oldIndex
        setValues(newArray)
      }
    },
    [setValues, values]
  )

  return (
    <>
      <input
        type='file'
        id='mediaInput'
        className='hidden'
        accept={ACCEPTED_FILE_TYPES.join(', ')}
        size={MAX_FILE_SIZE}
        ref={inputRef}
        onChange={handleInputChange}
        multiple
      />
      <div className='flex flex-col gap-2 md:gap-4'>
        <div className='flex text-muted-foreground w-full rounded-lg border border-input border-dashed p-4 items-center justify-center flex-col gap-2'>
          <UploadCloud className='h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' />
          <p className='text-center text-sm md:text-base'>
            <span
              className='underline cursor-pointer'
              onClick={() => inputRef.current?.click()}
            >
              Нажмите сюда
            </span>{' '}
            или перетащите файлы
          </p>
          <p className='text-xs md:text-sm'>
            Максимальный размер файла 100 МБ.
          </p>
        </div>
        {values.length >= 1 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={values.map((obj) => obj.id)}
              strategy={rectSortingStrategy}
            >
              <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
                {values
                  .sort((a, b) => a.index - b.index)
                  .map(({ id }) => (
                    <SortableMediaItem
                      key={id}
                      id={id}
                      isError={uploadStates[id] === 'error'}
                      isUploading={uploadStates[id] === 'uploading'}
                      setValues={setValues}
                      values={values}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </>
  )
}

type MediaItemProps = {
  id: string
  isUploading: boolean
  isError: boolean
  values: UploadedMedia[]
  setValues: (newValues: UploadedMedia[]) => void
  isDragging?: boolean
}

function MediaItem({ id, isUploading, isError, isDragging }: MediaItemProps) {
  return (
    <div key={id} className='select-none pointer-events-none'>
      {isUploading ? (
        <DisplayLoadingFile
          className={cn(
            'w-full aspect-square transition-all',
            isDragging && 'shadow-md'
          )}
        />
      ) : isError ? (
        <DisplayErrorFile
          className={cn(
            'w-full aspect-square transition-all',
            isDragging && 'shadow-md'
          )}
        />
      ) : (
        <DisplayUploadedFile
          className={cn(
            'w-full aspect-square transition-all',
            isDragging && 'shadow-md'
          )}
          id={id}
        />
      )}
    </div>
  )
}

function SortableMediaItem({
  id,
  isError,
  isUploading,
  setValues,
  values,
}: MediaItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  }

  return (
    <div ref={setNodeRef} style={style} className='relative'>
      <Button
        className={cn(
          'absolute top-0 left-0 m-1 h-8 w-8',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        size='icon'
        variant='secondary'
        {...attributes}
        {...listeners}
        type='button'
      >
        <Grip className='h-4 w-4' />
      </Button>
      <Button
        className='absolute top-0 right-0 m-1 h-8 w-8'
        size='icon'
        variant='outline'
        type='button'
        onClick={() => setValues(values.filter((v) => v.id !== id))}
      >
        <X className='h-4 w-4' />
      </Button>
      <MediaItem
        setValues={setValues}
        values={values}
        id={id}
        isError={isError}
        isUploading={isUploading}
        isDragging={isDragging}
      />
    </div>
  )
}
