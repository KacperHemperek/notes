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
    <div className={`flex flex-col items-center p-6 ${poppins.className}`}>
      <h1 className="font-bold text-2xl self-start mb-6">Your notes</h1>
      <NoteCardList notes={data} isLoading={isLoading} />
    </div>
  )
}
