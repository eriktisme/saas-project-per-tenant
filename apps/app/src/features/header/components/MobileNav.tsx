'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PanelRightOpenIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetTrigger,
} from '@/components/ui/sheet'
import { RouteSection } from '@/features/sidebar'
import { mainRoutes, settingsRoutes } from '@/config'
import { Protect } from '@clerk/nextjs'

export const MobileNav = () => {
  const [visible, toggleVisibility] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    toggleVisibility(false)
  }, [pathname])

  return (
    <Sheet open={visible} onOpenChange={toggleVisibility}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation"
          variant="ghost"
          className="group relative isolate h-full px-5 outline-none transition"
        >
          <PanelRightOpenIcon aria-hidden className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetContent side="left">
          <div>
            <div className="space-y-8">
              <RouteSection routes={mainRoutes} className="px-0" />
              <Protect role="org:admin">
                <RouteSection
                  title="Organization"
                  routes={settingsRoutes}
                  className="px-0"
                />
              </Protect>
            </div>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
