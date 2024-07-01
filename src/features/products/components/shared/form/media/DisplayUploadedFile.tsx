import Storage from '@/api/services/Storage'
import { cn } from '@/lib/utils'
import { ImageOff, Loader2, XCircle } from 'lucide-react'

export function DisplayLoadingFile({ className }: { className: string }) {
    return (
        <div
            className={cn(
                'border shadow-sm border-input rounded-lg bg-muted flex items-center justify-center',
                className
            )}
        >
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        </div>
    )
}

export function DisplayErrorFile({ className }: { className: string }) {
    return (
        <div
            className={cn(
                'border shadow-sm border-destructive rounded-lg flex items-center flex-col justify-center gap-2 text-center text-destructive',
                className
            )}
        >
            <XCircle className='h-6 w-6 shrink-0' />
            <span className='text-sm'>Ошибка</span>
        </div>
    )
}

export function DisplayNoFile({ className }: { className: string }) {
    return (
        <div
            className={cn(
                'border shadow-sm border-input rounded-lg bg-muted flex items-center justify-center',
                className
            )}
        >
            <ImageOff className='h-4 w-4 text-muted-foreground' />
        </div>
    )
}

export function DisplayUploadedFile({
    id,
    className,
}: {
    id: string
    className: string
}) {
    const { data, isLoading, isError } = Storage.useGetUrl({
        key: `Media/${id}`,
    })

    if (isLoading) {
        return <DisplayLoadingFile className={className} />
    }

    if (isError || !data) {
        return <DisplayErrorFile className={className} />
    }

    return (
        <img
            className={cn(
                'border shadow-sm border-input rounded-lg object-cover bg-white dark:bg-black flex shrink-0',
                className
            )}
            src={data}
            loading='eager'
        />
    )
}
