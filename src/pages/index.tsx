import {Poppins} from "next/font/google";
import {useAuth} from "~/context/auth-context";

const poppins = Poppins({subsets: ['latin'], weight: ['400', '500', '600', '700', '800']})

export default function Home() {

    const {user, signOut, signIn, loadingUser} = useAuth()

    console.log({user})

    if (loadingUser) return (
        <main className='flex min-h-screen flex-col items-center gap-20'>
            loading
        </main>
    )

    return (
        <main
            className={`flex min-h-screen flex-col items-center gap-20 p-24 ${poppins.className}`}
        >


            {user && (
                <>
                    <h1 className='text-4xl font-bold'>Welcome {user.email}</h1>

                    <button onClick={() => signOut()} className='bg-green-500 px-6 py-2 font-semibold'>
                        Sing Out
                    </button>
                </>
            )}

            {!user && (
                <>
                    <h1 className='text-4xl font-bold'>You need to sign in</h1>


                    <button onClick={() => signIn()} className='bg-green-500 px-6 py-2 font-semibold'>
                        Sing In
                    </button>
                </>
            )}

        </main>
    )
}
