'use client'

import { ForgotPasswordForm, ResetPasswordForm } from '../components'
import { useState } from 'react'
import type { ForgotPasswordStatus } from '../types'

export const ForgotPasswordPageTemplate = () => {
  const [forgotPasswordStatus, setForgotPasswordStatus] =
    useState<ForgotPasswordStatus>('initial')

  if (forgotPasswordStatus === 'verifying') {
    return <ResetPasswordForm />
  }

  return (
    <div className="flex flex-col gap-12">
      <ForgotPasswordForm setForgotPasswordStatus={setForgotPasswordStatus} />
    </div>
  )
}
