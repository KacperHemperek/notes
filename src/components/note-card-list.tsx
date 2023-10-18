import React, { useState } from 'react'
import { NOTES_LIST_TABLE, NoteList } from '~/models/notes'
import { AnimatePresence, motion } from 'framer-motion'
import { AddNoteDialog } from '~/components/add-note-dialog'
import { useMutation } from '@tanstack/react-query'
import { deleteNotesList } from '~/api/delete-note'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/context/auth-context'
import { Loader2, Plus, X } from 'lucide-react'
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '~/components/common/dialog'
import { NotesInput } from '~/components/inputs'
import { useForm } from 'react-hook-form'
import { NotesButton } from '~/components/common/button'

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
  notes?: NoteList[]
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
          className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
        >
          <AddNoteDialog
            trigger={
              <motion.button
                variants={item}
                className="flex flex-col items-center justify-center gap-1 rounded-lg border border-slate-800 p-4"
              >
                <h3 className="md:text-lg">Add new note</h3>
                <Plus className="h-8 w-8 md:h-10 md:w-10" />
              </motion.button>
            }
          />

          {notes?.map((note) => (
            <NoteCard key={'note__card__' + note.title + note.id} note={note} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function NoteCard({ note }: { note: NoteList }) {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const [open, setOpen] = useState(false)

  const {
    formState: { errors, isValid },
    register,
    reset,
    handleSubmit,
  } = useForm<{ title: string }>({
    mode: 'all',
  })

  // TODO: handler errors with a toast and bring back old data
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteNotesList,
    mutationKey: ['deleteNote', note.id],
    onMutate: () => {
      queryClient.setQueryData(['notes', user?.uid], (old?: NoteList[]) => {
        return old?.filter((n) => n.id !== note.id)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTES_LIST_TABLE, user?.uid])
    },
  })

  function onSubmit() {
    deleteMutation({ id: note.id, user })
    setOpen(false)
  }

  return (
    <DialogRoot onOpenChange={setOpen} open={open}>
      <motion.div
        layout={'position'}
        variants={item}
        key={note.id}
        className="flex flex-col gap-4 rounded-lg border border-slate-800 p-4"
      >
        <div className="flex justify-between">
          <h3 className="md:text-lg">{note.title}</h3>
          <DialogTrigger asChild>
            <button>
              <X className="h-4 w-4 text-slate-50 transition-colors hover:text-red-500 md:h-6 md:w-6" />
            </button>
          </DialogTrigger>
        </div>
        <p className="text-sm text-slate-500">{note.description}</p>
        {note.tags && (
          <div className="flex flex-row flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
      <DialogContent
        overlayClick={() => {
          reset()
          setOpen(false)
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Are You Sure</DialogTitle>
        <DialogDescription>
          When you delete this note, all of its data will be permanently removed
        </DialogDescription>
        <DialogDescription>
          To remove this note, type <strong>{note.title}</strong> in the field
        </DialogDescription>

        <div className="grid gap-6">
          <NotesInput
            errors={errors}
            label="Repeat title"
            register={register('title', {
              required: {
                value: true,
                message: 'Please repeat the title',
              },
              pattern: {
                value: new RegExp(note.title),
                message: 'The title is not correct',
              },
            })}
          />
          <NotesButton
            disabled={!isValid}
            variant="danger"
            type="submit"
            layout="position"
          >
            Delete Permanently
          </NotesButton>
          <NotesButton
            variant="secondary"
            type="reset"
            onClick={() => {
              reset()
              setOpen(false)
            }}
            layout="position"
          >
            Cancel
          </NotesButton>
        </div>
      </DialogContent>
    </DialogRoot>
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
      className="flex flex-col items-center justify-center pt-12"
    >
      <h2 className="text-semibold pb-4 text-xl">Loading your notes</h2>
      <Loader2 className="h-12 w-12 animate-spin" />
    </motion.div>
  )
}
