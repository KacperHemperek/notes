import { useMutation } from '@tanstack/react-query'
import { Note } from '~/models/notes'
import { useAuth } from '~/context/auth-context'
import { ApiMutationOptions, Create } from '~/types/api'
import { User } from 'firebase/auth'

export async function createNote({
    note,
    user,
}: {
    note: Create<Note>
    user: User | null
}) {
    if (!user) {
        throw new Error('Unauthorized')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return note
}
