import type { Metadata } from 'next'
import { SettingsPageTemplate } from '@/features/settings'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Page() {
  return <SettingsPageTemplate />
}
