import { useMutation } from '@tanstack/react-query'
import { Note } from '~/models/notes'
import { useAuth } from '~/context/auth-context'
import { ApiMutationOptions, Create } from '~/types/api'

export function useAddNote(options?: ApiMutationOptions) {
    const { user } = useAuth()

    return useMutation({
        ...options,
        mutationFn: async (note: Create<Note>) => {
            if (!user) {
                throw new Error('Unauthorized')
            }

            return note
        },
        mutationKey: ['new-note'],
    })
}
