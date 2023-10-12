import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { getNotes, getNotesLists } from '~/api/get-notes'
import { Loader2, Plus } from 'lucide-react'
import { AddNoteDialog } from '~/components/add-note-dialog'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import NoteCardList from '~/components/note-card-list'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export default function Home() {
    const { user } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['notes', user?.uid],
        queryFn: async () => getNotesLists(user),
    })

    return (
        <div className={`flex flex-col items-center p-6 ${poppins.className}`}>
            <h1 className="font-bold text-2xl self-start mb-6">Your notes</h1>
            <NoteCardList notes={data} isLoading={isLoading} />
        </div>
    )
}
