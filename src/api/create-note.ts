import { NOTES_LIST_TABLE, Note, NoteList } from '~/models/notes'
import { Create } from '~/types/api'
import { User } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '~/utils/firebase'

export async function createNote({
    note,
    user,
}: {
    note: Create<Note>
    user: User | null
    noteListId: string
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

export async function createNoteList({
    noteList,
    user,
}: {
    noteList: Create<NoteList>
    user: User | null
}) {
    if (!user) {
        throw new Error('Unauthorized')
    }

    const notesCollection = collection(db, 'users', user.uid, NOTES_LIST_TABLE)

    const docRef = await addDoc(notesCollection, noteList)

    return {
        id: docRef.id,
        ...noteList,
    }
}
