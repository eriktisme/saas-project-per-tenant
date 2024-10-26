'use client'

import type { PropsWithChildren } from 'react'

export const MainSidebar = (props: PropsWithChildren<unknown>) => {
  return (
    <aside className="relative isolate flex h-full w-[17rem] shrink-0 flex-col border-r bg-white max-lg:hidden">
      <div className="relative isolate flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto py-5 transition-opacity duration-100">
          <div>
            <div className="space-y-8">{props.children}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
