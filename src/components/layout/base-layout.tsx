import { Loader2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { useAuth } from '~/context/auth-context'
import { Navigation } from '~/components/navigation'
export function BaseLayout({ children }: { children?: React.ReactNode }) {
  const { user, loadingUser, signIn } = useAuth()

  const duration = 0.3

  return (
    <AnimatePresence>
      {loadingUser && !user && (
        <motion.main
          exit={{
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration }}
          key="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950"
        >
          <h1 className="mb-2 text-3xl">Loading your notes</h1>
          <p className="mb-8 text-slate-500">This may take a while</p>
          <Loader2 className="h-12 w-12 animate-spin text-slate-50" />
        </motion.main>
      )}
      {!loadingUser && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration }}
          className="flex min-h-screen flex-col bg-slate-950"
        >
          <Navigation />
          {user && children}
          {!user && (
            <div className="flex flex-col items-center justify-center border-red-500 pt-24">
              <h1 className="mb-2 text-3xl">Welcome to Notes</h1>
              <p className="mb-8 text-slate-500">Sign in to get started</p>
              <button
                className="rounded-md bg-slate-900 px-4 py-2 text-slate-50"
                onClick={signIn}
              >
                Sign in
              </button>
            </div>
          )}
        </motion.main>
      )}
    </AnimatePresence>
  )
}
