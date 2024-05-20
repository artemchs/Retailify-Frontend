import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { editProfileFormSchema } from './edit-profile-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Users from '@/api/services/Users'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { AlertDestructive } from '@/components/AlertDestructive'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import SaveButton from '@/components/forms/SaveButton'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import AsyncInput from '@/components/forms/AsyncInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import ImageCropper from './ImageCropper'
import { ImageOff } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import LogOutAlertDialog from '@/features/auth/log-out/LogOutAlertDialog'

function AccountSettingsForm() {
    return (
        <div className='flex flex-col gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Профиль</CardTitle>
                    <CardDescription>
                        Редактировать данные о профиле.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Выйти из аккаунта</CardTitle>
                    <CardDescription>
                        После успешного выхода из аккаунта вы будете
                        перенаправлены на страницу входа.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LogOutAlertDialog />
                </CardContent>
            </Card>
        </div>
    )
}

function ProfileForm() {
    const user = Users.useGetMe()

    const form = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            email: user.data?.email,
            fullName: user.data?.fullName,
        },
    })

    function onSuccess() {
        toast('Данные о профиле успешно отредактированы.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = Users.useUpdateMe({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
        mutate(values)
    }

    return (
        <div className='w-full flex flex-col gap-4'>
            {errorMessage && errorMessage.length >= 1 && (
                <AlertDestructive text={errorMessage} />
            )}
            <Form {...form}>
                <form className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Ф.И.О.' />
                                <FormControl>
                                    <AsyncInput
                                        input={
                                            <Input
                                                placeholder='Фамилия Имя Отчество'
                                                {...field}
                                            />
                                        }
                                        isError={user.isError}
                                        isLoading={user.isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelForRequiredFields text='Email' />
                                <FormControl>
                                    <AsyncInput
                                        input={
                                            <Input
                                                placeholder='Адрес електронной почты'
                                                {...field}
                                            />
                                        }
                                        isError={user.isError}
                                        isLoading={user.isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='profilePicture'
                        render={() => (
                            <FormItem>
                                <Label>Аватар:</Label>
                                <FormControl>
                                    <AsyncInput
                                        input={
                                            <ProfilePictureInput
                                                form={form}
                                                defaultImgUrl={
                                                    user.data?.profilePicture ??
                                                    undefined
                                                }
                                            />
                                        }
                                        isError={user.isError}
                                        isLoading={user.isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SaveButton
                        isPending={isPending}
                        form={form}
                        onSubmit={onSubmit}
                    />
                </form>
            </Form>
        </div>
    )
}

export const ASPECT_RATIO = 1
export const MIN_DIMENSION = 50

const ProfilePictureInput = ({
    form,
    defaultImgUrl,
}: {
    form: UseFormReturn<
        {
            email: string
            fullName: string
            profilePicture?: unknown
        },
        unknown,
        undefined
    >
    defaultImgUrl?: string
}) => {
    const [dataUrl, setDataUrl] = useState('')
    const [isOpened, setIsOpened] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            const imageElement = new Image()
            const imageUrl = reader.result?.toString() || ''
            imageElement.src = imageUrl

            imageElement.addEventListener('load', (e) => {
                form.resetField('profilePicture')
                // @ts-expect-error it actually contains these values
                const { naturalWidth, naturalHeight } = e.currentTarget
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    form.setError('profilePicture', {
                        message:
                            'Картинка должна быть как минимум 150 x 150 пикселей.',
                    })
                    return setImgSrc('')
                }
            })
            setImgSrc(imageUrl)
            setIsOpened(true)
        })
        reader.readAsDataURL(file)
    }

    const compressImage = async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(file, options)
            console.log(
                `Compressed file size: ${compressedFile.size / 1024 / 1024} MB`
            )
            return compressedFile
        } catch (error) {
            console.error('Error compressing image:', error)
            return file
        }
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
            inputRef.current.click()
        }
    }

    return (
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <div
                onClick={handleClick}
                className='rounded-md flex border border-input overflow-hidden h-12 select-none cursor-pointer'
            >
                {dataUrl ? (
                    <img
                        src={dataUrl}
                        className='h-full aspect-square object-cover'
                    />
                ) : defaultImgUrl ? (
                    <img
                        src={defaultImgUrl}
                        className='h-full aspect-square object-cover'
                    />
                ) : (
                    <div className='h-full bg-muted aspect-square object-cover flex items-center justify-center'>
                        <ImageOff className='h-4 w-4 shrink-0' />
                    </div>
                )}
                <div className='bg-background p-2 flex flex-col'>
                    <span className='text-xs'>Выберите аватарку</span>
                    <span className='text-xs text-muted-foreground'>
                        Принимает изображения размером от 100 x 100 пикселей
                    </span>
                </div>
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    onChange={onSelectFile}
                    className='hidden'
                />
            </div>
            <DialogContent className='max-h-[90%] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>
                        Редактировать выбранное изображение
                    </DialogTitle>
                </DialogHeader>
                <ImageCropper
                    setIsOpened={setIsOpened}
                    updateAvatar={async (dataUrl) => {
                        const file = base64ToFile(dataUrl)
                        const compressedFile = await compressImage(file)
                        form.setValue('profilePicture', compressedFile)
                        setDataUrl(dataUrl)
                    }}
                    imgSrc={imgSrc}
                />
            </DialogContent>
        </Dialog>
    )
}

function base64ToFile(base64String: string): File {
    const byteString = atob(base64String.split(',')[1])
    const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    const blob = new Blob([ab], { type: mimeString })
    return new File([blob], 'file', { type: mimeString })
}

export default AccountSettingsForm
