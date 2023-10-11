import React from 'react'
import { Note } from '~/models/notes'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Plus, X } from 'lucide-react'
import { AddNoteDialog } from '~/components/add-note-dialog'
import { useMutation } from '@tanstack/react-query'
import { deleteNote } from '~/api/delete-note'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/context/auth-context'

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

export default function NoteCardList({
    notes,
    isLoading,
}: {
    notes?: Note[]
    isLoading: boolean
}) {
    return (
        <AnimatePresence mode="wait">
            {isLoading && <NoteListLoader key="notes__list__loader" />}
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

                    {notes?.map((note, idx) => (
                        <NoteCard
                            key={'note__card__' + note.title + '__' + idx}
                            note={note}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export function NoteCard({ note }: { note: Note }) {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteNote,
        mutationKey: ['deleteNote', note.id],
        onMutate: () => {
            queryClient.setQueryData(['notes', user?.uid], (old?: Note[]) => {
                return old?.filter((n) => n.id !== note.id)
            })
        },
    })

    return (
        <motion.div
            layout={'position'}
            variants={item}
            key={note.id}
            className="flex flex-col gap-4 p-4 rounded-lg border border-slate-800"
        >
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <button onClick={() => deleteMutation({ id: note.id, user })}>
                    <X className="w-6 h-6 text-slate-50 hover:text-red-500 transition-colors" />
                </button>
            </div>
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
    )
}

function NoteListLoader() {
    return (
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
            <h2 className="text-xl text-semibold pb-4">Loading your notes</h2>
            <Loader2 className="w-12 h-12 animate-spin" />
        </motion.div>
    )
}
