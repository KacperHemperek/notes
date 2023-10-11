import * as D from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NotesInput, NotesTextarea } from '~/components/inputs'
import { Note } from '~/models/notes'
import { Create } from '~/types/api'
import { createNote } from '~/api/create-note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/context/auth-context'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { cn } from '~/utils/cn'

type FormState = {
    title: string
    question: string
    answer: string
    test: string
}

export function AddNoteDialog({ trigger }: { trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<FormState>({ mode: 'onChange' })

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries(['notes', user?.uid])
            handleOpenClose(false)
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const onSubmit = (data: FormState) => {
        if (currentStep < 1) {
            setCurrentStep((prev) => prev + 1)
            return
        }

        const newNote: Create<Note> = {
            title: data.title,
            question: data.question,
            answer: data.answer,
        }

        mutate({ note: newNote, user })
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
            <D.Root open={open} onOpenChange={handleOpenClose}>
                <>
                    <D.Trigger asChild>{trigger}</D.Trigger>
                    <D.Overlay className="fixed bg-slate-900/20 backdrop-blur-sm inset-0" />

                    <D.Content asChild>
                        <div
                            className="pointer-events-none bg-transparent inset-0 flex items-center justify-center fixed"
                            onClick={() => handleOpenClose(false)}
                        >
                            <motion.form
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.1,
                                        ease: 'easeOut',
                                    },
                                }}
                                layout="preserve-aspect"
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-slate-950 p-4 rounded-lg border border-slate-500 left-6 w-[calc(100vw-48px)] md:max-w-md overflow-hidden"
                            >
                                <D.Title asChild>
                                    <motion.h2
                                        layout="position"
                                        className="text-lg font-semibold"
                                    >
                                        Add new note
                                    </motion.h2>
                                </D.Title>
                                <D.Description asChild>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Add a new note to your collection
                                    </p>
                                </D.Description>
                                {currentStep >= 0 && (
                                    <motion.div
                                        className={cn(
                                            'grid gap-6',
                                            currentStep !== 0 && 'hidden'
                                        )}
                                    >
                                        <NotesInput
                                            register={register('title', {
                                                required: {
                                                    message:
                                                        'Title is required',
                                                    value: true,
                                                },
                                                minLength: {
                                                    message:
                                                        'Title must be at least 3 characters long',
                                                    value: 3,
                                                },
                                            })}
                                            errors={errors}
                                            label="Title"
                                            disabled={isLoading}
                                        />

                                        <NotesTextarea
                                            register={register('question', {
                                                required: {
                                                    message:
                                                        'Question is required',
                                                    value: true,
                                                },
                                                minLength: {
                                                    message:
                                                        'Question must be at least 7 characters long',
                                                    value: 7,
                                                },
                                            })}
                                            label="Question"
                                            errors={errors}
                                            disabled={isLoading}
                                        />

                                        <NotesTextarea
                                            register={register('answer', {
                                                required: {
                                                    message:
                                                        'Answer is required',
                                                    value: true,
                                                },
                                                minLength: {
                                                    message:
                                                        'Answer must be at least 7 characters long',
                                                    value: 7,
                                                },
                                            })}
                                            label="Answer"
                                            errors={errors}
                                            disabled={isLoading}
                                        />

                                        <motion.button
                                            animate={{
                                                opacity:
                                                    !isValid || isLoading
                                                        ? 0.5
                                                        : 1,
                                            }}
                                            type="submit"
                                            layout="position"
                                            disabled={isLoading || !isValid}
                                            className="flex text-sm uppercase flex-row gap-2 items-center justify-center bg-slate-50 text-slate-950 font-medium rounded-md p-2 w-full disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            Next
                                        </motion.button>
                                    </motion.div>
                                )}

                                {currentStep >= 1 && (
                                    <motion.div className="grid gap-6">
                                        <NotesInput
                                            label="Test"
                                            register={register('test', {
                                                required: {
                                                    message: 'Test is required',
                                                    value: true,
                                                },
                                                minLength: {
                                                    message:
                                                        'Test must be at least 3 characters long',
                                                    value: 3,
                                                },
                                            })}
                                            errors={errors}
                                        />

                                        <motion.button
                                            animate={{
                                                opacity:
                                                    !isValid || isLoading
                                                        ? 0.5
                                                        : 1,
                                            }}
                                            type="submit"
                                            layout="position"
                                            disabled={isLoading || !isValid}
                                            className="flex text-sm uppercase flex-row gap-2 items-center justify-center bg-slate-50 text-slate-950 font-medium rounded-md p-2 w-full disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            Submit
                                        </motion.button>
                                        <motion.button
                                            animate={{
                                                opacity: isLoading ? 0.5 : 1,
                                            }}
                                            onClick={() =>
                                                setCurrentStep(
                                                    (prev) => prev - 1
                                                )
                                            }
                                            type="button"
                                            layout="position"
                                            disabled={isLoading}
                                            className="flex flex-row gap-2 uppercase items-center font-medium justify-center bg-rose-500 text-slate-50 text-sm rounded-md p-2 w-full disabled:pointer-events-none"
                                        >
                                            Previous
                                        </motion.button>
                                    </motion.div>
                                )}
                            </motion.form>
                        </div>
                    </D.Content>
                </>
            </D.Root>
        </MotionConfig>
    )
}
