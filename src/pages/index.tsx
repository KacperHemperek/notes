import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { useGetNotes } from '~/hooks/api/use-get-notes'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export default function Home() {
    const { user } = useAuth()

    const { data } = useGetNotes(user)

    return (
        <div className={`flex flex-col items-center p-6 ${poppins.className}`}>
            {data?.map((note) => (
                <div
                    key={note.id}
                    className="flex flex-col gap-4 p-4 rounded-lg border border-slate-800"
                >
                    <h1>{note.title}</h1>
                    <p>{note.question}</p>
                    {note.tags && (
                        <div className="flex flex-row gap-2">
                            {note.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-sm text-white bg-slate-800 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
