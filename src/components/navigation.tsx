import { useAuth } from '~/context/auth-context'
// FIXME: padding not matching with the rest of the app probably should use a container instead
export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex w-screen p-4 bg-slate-900 justify-between items-center sticky top-0 left-0">
      <h2 className="text-lg font-semibold">Notes</h2>
      {user && user.photoURL && (
        <div
          className="flex w-8 h-8 rounded-full overflow-hidden"
          onClick={signOut}
        >
          <img src={user.photoURL} alt="Profile image" />
        </div>
      )}
      {!user && <div className="w-8 h-8"></div>}
    </nav>
  )
}
