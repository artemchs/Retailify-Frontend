import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { MessageCircleMore } from 'lucide-react'

export default function ViewComment({ comment }: { comment: string | null }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='flex items-center gap-1'>
                    <MessageCircleMore className='h-4 w-4' />
                    Просмотреть
                </TooltipTrigger>
                <TooltipContent>
                    <p className='text-pretty max-w-screen-sm'>{comment}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
