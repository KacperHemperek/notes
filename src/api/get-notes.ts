import { useQuery } from '@tanstack/react-query'
import { User } from 'firebase/auth'
import { db } from '~/utils/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Note } from '~/models/notes'

export async function getNotes(user: User | null) {
    if (!user) {
        throw new Error('User not found')
    }
    const userNotesCollection = collection(db, 'users', user.uid, 'notes')
    const userNotesSnap = await getDocs(userNotesCollection)
    if (userNotesSnap.empty) {
        return []
    }

    const notes: Note[] = []

    userNotesSnap.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data(),
        } as Note)
    })

    return notes
}
