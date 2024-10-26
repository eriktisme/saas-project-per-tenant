import type { ReactElement, ReactNode } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ClerkProvider } from '@clerk/nextjs'

jest.mock('@clerk/nextjs')

const Providers = ({ children }: Readonly<{ children: ReactNode }>) => (
  <ClerkProvider publishableKey="">{children}</ClerkProvider>
)

export const renderWithContext = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(component, {
    wrapper: Providers,
    ...options,
  })
}
