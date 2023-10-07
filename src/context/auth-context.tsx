import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth'
import { auth, provider } from '~/utils/firebase'
import { signOut as firebaseSignOut } from 'firebase/auth'

function useAuthContextValue() {
    const [user, setUser] = React.useState<User | null>(null)

    const [loadingUser, setLoadingUser] = useState<boolean>(false)

    useEffect(() => {
        if (!user) {
            setLoadingUser(true)
        }

        const unsub = onAuthStateChanged(
            auth,
            (user) => {
                setUser(user)
                setLoadingUser(false)
            },
            (e) => {
                console.error(e)
            },
            () => {
                setLoadingUser(false)
            }
        )

        return () => {
            unsub()
        }
    }, [])

    async function signIn() {
        try {
            await signInWithPopup(auth, provider)
        } catch (e) {
            console.error(e)
        }
    }

    function signOut() {
        try {
            void firebaseSignOut(auth)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        user,
        signIn,
        signOut,
        loadingUser,
    }
}

type AuthContextValue = ReturnType<typeof useAuthContextValue>

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const value = useAuthContextValue()

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthContextProvider')
    }
    return context
}

export default AuthContext
