export const NOTES_LIST_TABLE = 'note_lists'

export type NoteList = {
  id: string
  notes: Note[]
  title: string
  description: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export type Note = {
  id: string
  question: string
  answer: string
  hints?: string[]
  createdAt: string
  updatedAt: string
}
