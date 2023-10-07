import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { useAddNote } from '~/hooks/api/use-add-note'
import { Note } from '~/models/notes'
import { Create } from '~/types/api'
import { FullPageLoading } from '~/components/full-page-loading'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export default function Home() {
    const { user, signOut, signIn, loadingUser } = useAuth()

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
        <FullPageLoading loading={loadingUser}>
            <div
                className={`flex min-h-screen flex-col items-center gap-20 p-24 ${poppins.className}`}
            >
                {user && (
                    <>
                        <h1 className="text-4xl font-bold">
                            Welcome {user.email}
                        </h1>

                        <button
                            onClick={() => signOut()}
                            className="bg-green-500 px-6 py-2 font-semibold"
                        >
                            Sing Out
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <h1 className="text-4xl font-bold">
                            You need to sign in
                        </h1>

                        <button
                            onClick={() => signIn()}
                            className="bg-green-500 px-6 py-2 font-semibold"
                        >
                            Sing In
                        </button>
                    </>
                )}

                <button onClick={() => mutate(newNote)}>Add note</button>
            </div>
        </FullPageLoading>
    )
}
