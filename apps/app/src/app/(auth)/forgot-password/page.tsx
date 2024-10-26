import type { Metadata } from 'next'
import { ForgotPasswordPageTemplate } from '@/features/sign-in'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function Page() {
  return <ForgotPasswordPageTemplate />
}
