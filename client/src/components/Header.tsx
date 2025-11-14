import { Link, useRouter } from '@tanstack/react-router'
import { LogIn, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { authClient } from '../../lib/auth-client'

export default function Header() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [error, setError] = useState('failed to logout')

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [error])

  const handleLogin = () => {
    router.navigate({ to: '/signin' })
  }

  const handleLogout = async () => {
    setError('')
    try {
      await authClient.signOut()
      router.navigate({ to: '/signin' })
    } catch (e) {
      console.error('Logout failed', e)
      setError('failed to logout')
    }
  }

  return (
    <>
      <header className="gap-2 bg-base-100 text-black justify-between">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="px-2">
              <Link
                to="/"
                activeProps={{ className: 'font-bold text-primary' }}
              >
                Home
              </Link>
            </div>
            <div className="px-2">
              <Link
                to="/todos"
                activeProps={{ className: 'font-bold text-primary' }}
              >
                Todos
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            {isPending ? null : session ? (
              <button
                aria-label="logout"
                className="btn btn-ghost btn-sm"
                onClick={handleLogout}
              >
                <LogOut className="size-4 hover:text-warning" />
              </button>
            ) : (
              <button
                aria-label="Login"
                className="btn btn-ghost btn-sm"
                onClick={handleLogin}
              >
                <LogIn className="size-5 hover:text-primary" />
              </button>
            )}
          </div>
        </nav>
        {error && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
