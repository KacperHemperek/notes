import * as D from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
export function DialogRoot({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <D.Root open={open} onOpenChange={onOpenChange}>
      {children}
      <D.Overlay className="fixed bg-slate-900/20 backdrop-blur-sm inset-0" />
    </D.Root>
  )
}

export function DialogContent({
  children,
  overlayClick,
  onSubmit,
}: {
  children: React.ReactNode
  overlayClick: () => void
  onSubmit?: (e: React.FormEvent) => void
}) {
  return (
    <D.Content asChild>
      <div
        className="pointer-events-none bg-transparent inset-0 flex items-center justify-center fixed z-50"
        onClick={overlayClick}
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
          onSubmit={onSubmit}
          className="bg-slate-950 p-4 rounded-lg border border-slate-500 left-6 w-[calc(100vw-48px)] md:max-w-md overflow-hidden"
        >
          {children}
        </motion.form>
      </div>
    </D.Content>
  )
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <D.Title asChild>
      <motion.h2 layout="position" className="text-lg font-semibold">
        {children}
      </motion.h2>
    </D.Title>
  )
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return (
    <D.Description asChild>
      <motion.p layout="position" className="text-sm text-slate-400 mb-4">
        {children}
      </motion.p>
    </D.Description>
  )
}

export const DialogTrigger = D.Trigger
