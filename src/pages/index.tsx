import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { useAddNote } from '~/hooks/api/use-add-note'
import { Note } from '~/models/notes'
import { Create } from '~/types/api'
import { BaseLayout } from '~/components/layout/base-layout'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export default function Home() {
    const { mutate } = useAddNote({
        onError: (e) => {
            console.error(e)
        },
    })

    const newNote: Create<Note> = {
        title: 'New note',
        question: 'New note content',
        answer: 'New note answer',
        tags: ['tag1', 'tag2'],
        hints: ['hint1', 'hint2'],
    }

    return (
        <div
            className={`flex flex-col items-center gap-20 p-24 ${poppins.className}`}
        >
            <button onClick={() => mutate(newNote)}>Add note</button>
        </div>
    )
}
