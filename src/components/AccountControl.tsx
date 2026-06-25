/**
 * AccountControl — a compact sign-in button / account menu used in the home
 * page header. Replaces the old global top nav: the app no longer has a sticky
 * bar, so this is the one place to sign in and out.
 */

import { useState } from 'react'
import { AuthOverlay, useAuthProfileReady, signOut } from 'deepspace'
import { ChevronDown, LogOut } from 'lucide-react'
import { Skeleton } from './ui'
import { cn } from './ui/utils'

export default function AccountControl() {
  const { isLoaded, isSignedIn, user, userLoading } = useAuthProfileReady({ requireUser: true })
  const [showAuth, setShowAuth] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isLoaded) return <Skeleton className="h-9 w-24 rounded-full" />

  if (!isSignedIn || (userLoading && !user)) {
    return (
      <>
        <button
          data-testid="nav-sign-in-button"
          onClick={() => setShowAuth(true)}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
        {showAuth && <AuthOverlay onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  if (!user) return <Skeleton className="h-9 w-9 rounded-full" />

  const initial = (user.name?.[0] ?? user.email?.[0] ?? '?').toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        className="group flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-2.5 text-sm transition-colors hover:bg-card"
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initial
          )}
        </span>
        <span data-testid="nav-user-name" className="hidden max-w-[140px] truncate text-foreground sm:inline">
          {user.name || user.email}
        </span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', menuOpen && 'rotate-180')}
          aria-hidden
        />
      </button>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} aria-hidden />
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)]"
          >
            <div className="border-b border-border px-3.5 py-3">
              <div className="truncate text-sm font-medium text-foreground">{user.name || 'Signed in'}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
            </div>
            <button
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                signOut()
              }}
              className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
