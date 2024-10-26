import type { PropsWithChildren, ReactNode } from 'react'
import { Protect } from '@clerk/nextjs'

export default function Layout(props: PropsWithChildren<ReactNode>) {
  return <Protect role="org:admin">{props.children}</Protect>
}
