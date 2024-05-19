import { SyntheticEvent, useRef, useState } from 'react'
import ReactCrop, {
    Crop,
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from 'react-image-crop'
import setCanvasPreview from './setCanvasPreview'
import 'react-image-crop/dist/ReactCrop.css'
import { ASPECT_RATIO, MIN_DIMENSION } from './AccountSettingsForm'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

type Props = {
    setIsOpened: (value: boolean) => void
    updateAvatar: (dataUrl: string) => void
    imgSrc: string
}

const ImageCropper = ({ setIsOpened, updateAvatar, imgSrc }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [crop, setCrop] = useState<Crop>()

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100

        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
    }

    return (
        <>
            {imgSrc && (
                <div className='flex flex-col gap-4 items-center'>
                    <div className='flex w-full rounded-md overflow-hidden shadow-lg'>
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                    <DialogFooter>
                        <Button
                            type='button'
                            onClick={() => {
                                if (
                                    imgRef.current &&
                                    previewCanvasRef.current &&
                                    crop
                                ) {
                                    setCanvasPreview(
                                        imgRef.current,
                                        previewCanvasRef.current,
                                        convertToPixelCrop(
                                            crop,
                                            imgRef.current.width,
                                            imgRef.current.height
                                        )
                                    )
                                    const dataUrl =
                                        previewCanvasRef.current.toDataURL()
                                    updateAvatar(dataUrl)
                                    setIsOpened(false)
                                }
                            }}
                        >
                            <Check className='h-4 w-4 mr-2' />
                            Выбрать
                        </Button>
                    </DialogFooter>
                </div>
            )}
            {crop && <canvas ref={previewCanvasRef} className='hidden' />}
        </>
    )
}

export default ImageCropper
