'use client'

import { useState } from 'react'
import { VerifyForm, SignUpForm, WorkspaceForm } from '../components'
import type { SignUpStatus } from '../types'

export const SignUpPageTemplate = () => {
  const [signUpStatus, setSignUpStatus] = useState<SignUpStatus>('initial')

  if (signUpStatus === 'verifying') {
    return <VerifyForm setSignUpStatus={setSignUpStatus} />
  }

  if (signUpStatus === 'creating-workspace') {
    return <WorkspaceForm />
  }

  return <SignUpForm setSignUpStatus={setSignUpStatus} />
}
