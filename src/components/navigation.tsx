import { useAuth } from '~/context/auth-context'
export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="sticky left-0 top-0 flex w-screen items-center justify-between bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-lg font-semibold">Notes</h2>
        {user && user.photoURL && (
          <div
            className="flex h-8 w-8 overflow-hidden rounded-full"
            onClick={signOut}
          >
            <img src={user.photoURL} alt="Profile image" />
          </div>
        )}
        {!user && <div className="h-8 w-8"></div>}
      </div>
    </nav>
  )
}
