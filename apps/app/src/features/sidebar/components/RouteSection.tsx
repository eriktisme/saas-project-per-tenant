'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ItemProps } from '@/config'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
  routes: ItemProps[]
  title?: string
}

export const RouteSection = (props: Props) => {
  const path = usePathname()

  return (
    <div {...props} className={cn('isolate space-y-2 px-3', props.className)}>
      {props.title ? (
        <div className="text-tertiary pl-3 text-sm font-medium">
          {props.title}
        </div>
      ) : null}
      <div className="space-y-1">
        {props.routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="block rounded-md ring-2 ring-transparent focus-visible:outline-none focus-visible:ring-blue-400"
          >
            <div className="z-1 relative w-full rounded-md ring-2 ring-transparent focus-visible:outline-none focus-visible:ring-blue-400">
              <span
                className={cn(
                  'group flex h-[34px] items-center justify-between rounded-md pl-3 pr-[0.9375rem]',
                  path === route.href ? 'bg-slate-100' : 'hover:bg-slate-50'
                )}
              >
                <span className="flex items-center justify-between gap-2.5">
                  <span className="text-slate-700">{route.icon}</span>
                  <span className="flex items-center gap-2 text-base font-medium">
                    {route.title}
                  </span>
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
