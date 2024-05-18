import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { SoleProprietorInfo } from '@/types/entities/SoleProprietorInfo'
import { OnSuccess, SetErrorMessage } from './types'
import { EditSoleProprietorInfoSchema } from '@/features/sole-proprietor-info/types/edit-sole-proprietor-info-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'

export default function VariantAdditionalAttributes() {
    const MUTATION_KEYS = {
        EDIT: 'edit-sole-proprietor-info',
        FIND_ONE: 'sole-proprietor-info',
    }

    return {
        useFindOne: () =>
            useQuery({
                queryKey: [MUTATION_KEYS.FIND_ONE],
                queryFn: async () => {
                    const { data } = await client.get(`/sole-proprietor-info`)
                    return data as SoleProprietorInfo
                },
            }),

        useEdit: ({
            setErrorMessage,
            onSuccess,
        }: {
            setErrorMessage: SetErrorMessage
            onSuccess: OnSuccess
        }) =>
            useMutation({
                mutationKey: [MUTATION_KEYS.EDIT],
                mutationFn: async ({
                    body,
                }: {
                    body: EditSoleProprietorInfoSchema
                }) => {
                    return await client.post(`/sole-proprietor-info`, body)
                },
                onSuccess: ({ data }) => {
                    queryClient.invalidateQueries({
                        queryKey: [MUTATION_KEYS.FIND_ONE],
                    })
                    onSuccess(data)
                },
                onError: (error: AxiosError) =>
                    onErrorHandler({ error, setErrorMessage }),
            }),
    }
}
