import { useMutation } from "@tanstack/react-query"
import { SetErrorMessage } from "./types"
import client from "../client"
import { AxiosError } from "axios"
import onErrorHandler from "./utils/onErrorHandler"

const MUTATION_KEYS = {
    UPLOAD_IMPORT_FILE: 'upload-import-file-product-import',
}

export default {
    useUploadImportFile: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (id: string) => void
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.UPLOAD_IMPORT_FILE],
            mutationFn: async (file: File) => {
                const {
                    data: { url: presignedPutUrl, key: newFileId },
                }: {
                    data: {
                        url: string
                        key: string
                    }
                } = await client.post(`/storage`, {
                    dir: 'Import',
                })

                const uploadRes = await fetch(presignedPutUrl, {
                    body: file,
                    method: 'PUT',
                })

                if (!uploadRes.ok) {
                    throw new Error('Error while uploading import file.')
                }

                return newFileId
            },
            onSuccess,
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),
}
