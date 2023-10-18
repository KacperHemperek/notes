import React, { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '~/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'

export function NotesInput({
  register,
  errors,
  label,
  disabled = false,
  type = 'text',
}: {
  label: string
  register: UseFormRegisterReturn
  errors: FieldErrors
  disabled?: boolean
  type?: InputHTMLAttributes<unknown>['type']
}) {
  return (
    <motion.div className="flex flex-col" layout="position">
      <motion.label
        layout="position"
        htmlFor={register.name}
        className={cn(
          'mb-2 text-xs capitalize text-slate-400',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        {label}
      </motion.label>
      <motion.input
        layout="position"
        {...register}
        type={type}
        id={register.name}
        disabled={disabled}
        className={
          'rounded-md border border-slate-500 bg-slate-950 p-2 text-sm outline-0 ring-slate-50 ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
        }
      />
      <AnimatePresence>
        {register.name in errors && errors[register.name] && (
          <motion.p
            key={register.name + '__error__name'}
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -5, height: 0, paddingTop: 0 }}
            className="pt-2 text-xs text-rose-600"
          >
            {errors[register.name]?.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function NotesTextarea({
  register,
  label,
  errors,
  rows = 3,
  disabled = false,
}: {
  register: UseFormRegisterReturn
  label: string
  errors: FieldErrors
  rows?: number
  disabled?: boolean
}) {
  return (
    <motion.div layout="position" className="flex flex-col">
      <label
        htmlFor={register.name}
        className="mb-2 text-xs text-slate-400 disabled:pointer-events-none disabled:opacity-50"
      >
        {label}
      </label>
      <textarea
        {...register}
        rows={rows}
        name={register.name}
        id={register.name}
        disabled={disabled}
        className={cn(
          'resize-none rounded-md border border-slate-500 bg-slate-950 p-2 text-sm outline-0 disabled:pointer-events-none disabled:opacity-50'
        )}
      />

      <AnimatePresence>
        {register.name in errors && errors[register.name] && (
          <motion.p
            key={register.name + '__error__name'}
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -5, height: 0, paddingTop: 0 }}
            className="pt-2 text-xs text-rose-600"
          >
            {errors[register.name]?.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
