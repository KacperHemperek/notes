import { Loader2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
export function FullPageLoading({
    children,
    loading,
}: {
    children?: React.ReactNode
    loading: boolean
}) {
    const duration = 0.3

    return (
        <AnimatePresence>
            {loading && (
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
            {!loading && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration }}
                >
                    {children}
                </motion.main>
            )}
        </AnimatePresence>
    )
}
