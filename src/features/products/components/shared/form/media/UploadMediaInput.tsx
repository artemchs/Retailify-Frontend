import { v4 as uuid } from 'uuid'
import { Grip, UploadCloud, X } from 'lucide-react'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
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
import { useDropzone } from 'react-dropzone'
import client from '@/api/client'

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

  const handleFilesUpload = useCallback(
    async (files?: File[]) => {
      if (files && files.length >= 1) {
        await Promise.all(
          files.map(async (file) => {
            const key = `products/${uuid()}`

            setUploadStates((prevStates) => ({
              ...prevStates,
              [key]: 'uploading',
            }))
            const newArray = values
            newArray.push({
              id: key,
              index: newArray.length,
            })
            setValues(newArray)

            try {
              const { data } = await client.post(`/storage?key=${key}`)
              await fetch(data, {
                body: file,
                method: 'PUT',
              })
              setUploadStates((prevStates) => ({
                ...prevStates,
                [key]: 'idle',
              }))
            } catch (error) {
              setUploadStates((prevStates) => ({
                ...prevStates,
                [key]: 'error',
              }))
              console.error('Error uploading file:', error)
            }
          })
        )
      }
    },
    [setValues, values]
  )

  const onDrop = useCallback(
    (files?: File[]) => {
      if (files && files.length >= 1) {
        const acceptedFiles = files.filter((file) => validateFile(file))
        handleFilesUpload(acceptedFiles)
      }
    },
    [handleFilesUpload]
  )
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    if (files && files.length >= 1) {
      const acceptedFiles = files.filter((file) => validateFile(file))
      handleFilesUpload(acceptedFiles)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
        {...getInputProps()}
      />
      <div className='flex flex-col gap-2 md:gap-4'>
        <div
          {...getRootProps()}
          className={cn(
            'flex transition-all w-full rounded-lg border border-dashed p-4 items-center justify-center flex-col gap-2',
            isDragActive
              ? 'border-primary text-primary'
              : 'border-input text-muted-foreground'
          )}
        >
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
              <div className='grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
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
