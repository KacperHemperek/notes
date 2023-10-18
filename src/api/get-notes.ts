import { User } from 'firebase/auth'
import { db } from '~/utils/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { NOTES_LIST_TABLE, Note, NoteList } from '~/models/notes'

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

export async function getNotesLists(user: User | null) {
  if (!user) {
    throw new Error('User not found')
  }
  const userNotesCollection = collection(
    db,
    'users',
    user.uid,
    NOTES_LIST_TABLE
  )
  const userNotesSnap = await getDocs(userNotesCollection)
  if (userNotesSnap.empty) {
    return []
  }

  const notes: NoteList[] = []

  userNotesSnap.forEach((doc) => {
    notes.push({
      id: doc.id,
      ...doc.data(),
    } as NoteList)
  })

  return notes.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}
