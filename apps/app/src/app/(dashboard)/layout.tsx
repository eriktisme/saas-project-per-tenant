'use client'

import type { PropsWithChildren, ReactNode } from 'react'
import { MainSidebar, RouteSection } from '@/features/sidebar'
import { MainHeader, MobileNav } from '@/features/header'
import { mainRoutes, settingsRoutes } from '@/config'
import { Protect, useOrganization } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function Layout(props: PropsWithChildren<ReactNode>) {
  const { organization } = useOrganization()

  const paths = usePathname()

  const pathNames = paths.split('/').filter((path) => path)
  const pathItems = pathNames.map((path, i) => ({
    name: path,
    path: pathNames.slice(0, i + 1).join('/'),
  }))

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <MainHeader />
      <div className="flex min-h-10 overflow-x-auto border-b bg-gray-100">
        <div className="flex items-center border-r lg:hidden">
          <MobileNav />
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 px-5">
          <div className="shrink-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/inbox">
                    {organization?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathItems.map((item) => (
                  <BreadcrumbItem key={item.path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href={`/${item.path}`}>
                      {item.name.replace('-', ' ')}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="shrink-0"></div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <MainSidebar>
          <RouteSection routes={mainRoutes} />
          <Protect role="org:admin">
            <RouteSection title="Organization" routes={settingsRoutes} />
          </Protect>
        </MainSidebar>
        <main className="relative isolate w-full flex-1 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </div>
  )
}
