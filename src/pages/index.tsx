import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { getNotesLists } from '~/api/get-notes'
import { useQuery } from '@tanstack/react-query'
import NoteCardList from '~/components/note-card-list'
import { NOTES_LIST_TABLE } from '~/models/notes'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export default function Home() {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: [NOTES_LIST_TABLE, user?.uid],
    queryFn: async () => getNotesLists(user),
  })

  return (
    <div className="px-4">
      <div
        className={`container mx-auto flex flex-col items-center py-12 ${poppins.className}`}
      >
        <h1 className="mb-6 self-start text-2xl font-bold">Your notes</h1>
        <NoteCardList notes={data} isLoading={isLoading} />
      </div>
    </div>
  )
}
