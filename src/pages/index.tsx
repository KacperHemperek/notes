import { Poppins } from 'next/font/google'
import { useAuth } from '~/context/auth-context'
import { getNotes } from '~/api/get-notes'
import { Loader2, Plus } from 'lucide-react'
import { AddNoteDialog } from '~/components/add-note-dialog'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

const parent = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const item = {
    initial: {
        opacity: 0,
        y: -10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
}

export default function Home() {
    const { user } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['notes', user?.uid],
        queryFn: async () => getNotes(user),
    })

    return (
        <div className={`flex flex-col items-center p-6 ${poppins.className}`}>
            <h1 className="font-bold text-2xl self-start mb-6">Your notes</h1>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                delay: 0.1,
                            },
                        }}
                        key="loader"
                        className="pt-12 flex flex-col items-center justify-center"
                    >
                        <h2 className="text-xl text-semibold pb-4">
                            Loading your notes
                        </h2>
                        <Loader2 className="w-12 h-12 animate-spin" />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.div
                        variants={parent}
                        initial="initial"
                        animate="animate"
                        transition={{
                            staggerChildren: 0.3,
                        }}
                        key="notes"
                        className="grid grid-cols-1 gap-2 w-full md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AddNoteDialog
                            trigger={
                                <motion.button
                                    variants={item}
                                    className="flex flex-col gap-4 p-4 rounded-lg border border-slate-800 items-center justify-center"
                                >
                                    <h3 className="text-lg font-semibold ">
                                        Add new note
                                    </h3>
                                    <Plus className="w-12 h-12" />
                                </motion.button>
                            }
                        />

                        {data?.map((note) => (
                            <motion.div
                                variants={item}
                                key={note.id}
                                className="flex flex-col gap-4 p-4 rounded-lg border border-slate-800"
                            >
                                <h3 className="text-xl font-semibold">
                                    {note.title}
                                </h3>
                                <p>{note.question}</p>
                                <p className="text-green-200">{note.answer}</p>
                                {note.tags && (
                                    <div className="flex flex-row flex-wrap gap-2">
                                        {note.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-sm text-white bg-slate-800 rounded-md whitespace-nowrap"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
