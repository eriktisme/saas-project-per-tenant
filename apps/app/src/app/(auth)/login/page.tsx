import type { Metadata } from 'next'
import { SignInPageTemplate } from '@/features/sign-in'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Page() {
  return <SignInPageTemplate />
}
