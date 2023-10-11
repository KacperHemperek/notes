import { User } from 'firebase/auth'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/utils/firebase'

export async function deleteNote({
    id,
    user,
}: {
    id: string
    user: User | null
}) {
    if (!user) {
        throw new Error('User is not logged in')
    }

    const notesCollection = collection(db, `users/${user.uid}/notes`)

    await deleteDoc(doc(notesCollection, id))
}
