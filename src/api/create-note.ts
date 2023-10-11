import { useMutation } from '@tanstack/react-query'
import { Note } from '~/models/notes'
import { useAuth } from '~/context/auth-context'
import { ApiMutationOptions, Create } from '~/types/api'
import { User } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '~/utils/firebase'

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

    const notesCollection = collection(db, 'users', user.uid, 'notes')

    const docRef = await addDoc(notesCollection, note)

    return {
        ...note,
        id: docRef.id,
    }
}
