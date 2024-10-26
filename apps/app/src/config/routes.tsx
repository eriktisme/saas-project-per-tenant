import type { ReactNode } from 'react'
import { HomeIcon, SettingsIcon } from 'lucide-react'

export interface ItemProps {
  href: string
  icon: ReactNode
  title: string
}

export const mainRoutes: ItemProps[] = [
  {
    icon: <HomeIcon aria-hidden className="h-4 w-4" />,
    href: '/dashboard',
    title: 'Dashboard',
  },
]

export const settingsRoutes: ItemProps[] = [
  {
    icon: <SettingsIcon aria-hidden className="h-4 w-4" />,
    href: '/settings',
    title: 'Settings',
  },
]
