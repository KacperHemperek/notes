import { Loader2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { useAuth } from '~/context/auth-context'
import { useRouter } from 'next/router'
import { Navigation } from '~/components/navigation'
export function BaseLayout({ children }: { children?: React.ReactNode }) {
    const { user, loadingUser, signOut, signIn } = useAuth()

    const router = useRouter()

    const duration = 0.3

    if (!loadingUser && !user) {
        // void router.push('/')
    }

    return (
        <AnimatePresence>
            {loadingUser && !user && (
                <motion.main
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration }}
                    key="loader"
                    className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center"
                >
                    <h1 className="text-3xl mb-2">Loading your notes</h1>
                    <p className="mb-8 text-slate-500">This may take a while</p>
                    <Loader2 className="animate-spin text-slate-50 w-12 h-12" />
                </motion.main>
            )}
            {!loadingUser && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration }}
                    className="flex flex-col min-h-screen bg-slate-950"
                >
                    <Navigation />
                    {user && children}
                    {!user && (
                        <div className="flex flex-col items-center justify-center border-red-500 pt-24">
                            <h1 className="text-3xl mb-2">Welcome to Notes</h1>
                            <p className="mb-8 text-slate-500">
                                Sign in to get started
                            </p>
                            <button
                                className="bg-slate-900 text-slate-50 px-4 py-2 rounded-md"
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
