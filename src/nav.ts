/**
 * Navigation Config
 *
 * Add one entry per nav item. Routes are handled by generouted
 * (file-based routing in src/pages/), this just controls what
 * appears in the navigation bar.
 */

import type { Role } from './constants'

export interface NavItem {
  path: string
  label: string
  roles?: Role[]
  devOnly?: boolean
}

export const nav: NavItem[] = [
  // The brand mark already links home; keep the top bar clean and single-purpose.
  { path: '/api-status', label: 'API Status', devOnly: true },
  // ── Features add nav items below this line ──
]
