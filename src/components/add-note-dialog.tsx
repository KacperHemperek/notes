import * as D from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NotesInput, NotesTextarea } from '~/components/inputs'
import { NOTES_LIST_TABLE, NoteList } from '~/models/notes'
import { Create } from '~/types/api'
import { createNoteList } from '~/api/create-note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/context/auth-context'
import { MotionConfig } from 'framer-motion'
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '~/components/common/dialog'
import { NotesButton } from '~/components/common/button'

type FormState = {
  title: string
  description: string
}

export function AddNoteDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormState>({ mode: 'onChange' })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: createNoteList,
    onSuccess: () => {
      queryClient.invalidateQueries([NOTES_LIST_TABLE, user?.uid])
      setOpen(false)
      reset()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (data: FormState) => {
    const newList: Create<NoteList> = {
      title: data.title.trim(),
      description: data.description.trim(),
      notes: [],
    }

    mutate({ noteList: newList, user })
  }

  function handleOpenClose(val: boolean) {
    if (isLoading) {
      return
    }

    if (!val) {
      reset()
    }
    setOpen(val)
  }

  return (
    <MotionConfig
      transition={{
        layout: {
          ease: 'easeOut',
          duration: 0.3,
        },
        opacity: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
    >
      <DialogRoot open={open} onOpenChange={handleOpenClose}>
        <>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent
            overlayClick={() => handleOpenClose(false)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogTitle>Add new note</DialogTitle>

            <DialogDescription>
              Add a new note to your collection
            </DialogDescription>

            <div className={'grid gap-6'}>
              <NotesInput
                register={register('title', {
                  required: {
                    message: 'Title is required',
                    value: true,
                  },
                  minLength: {
                    message: 'Title must be at least 3 characters long',
                    value: 3,
                  },
                })}
                errors={errors}
                label="Title"
                disabled={isLoading}
              />

              <NotesTextarea
                register={register('description', {
                  required: {
                    message: 'Question is required',
                    value: true,
                  },
                  minLength: {
                    message: 'Question must be at least 7 characters long',
                    value: 7,
                  },
                })}
                label="Description"
                errors={errors}
                disabled={isLoading}
              />
              <NotesButton
                animate={{
                  opacity: !isValid || isLoading ? 0.5 : 1,
                }}
                type="submit"
                layout="position"
                disabled={isLoading || !isValid}
                variant="primary"
                className="uppercase"
              >
                Submit
              </NotesButton>
            </div>
          </DialogContent>
        </>
      </DialogRoot>
    </MotionConfig>
  )
}
