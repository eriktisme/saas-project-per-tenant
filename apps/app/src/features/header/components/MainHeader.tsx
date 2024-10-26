import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import Link from 'next/link'
import { CircleUserIcon, SlashIcon } from 'lucide-react'

export const MainHeader = () => {
  return (
    <div className="flex h-16 items-center justify-between overflow-x-auto border-b px-5">
      <div className="flex items-center">
        <Link
          aria-label="Go to dashboard home page"
          className="rounded-lg outline-none ring-2 ring-transparent focus-visible:ring-blue-400 max-lg:hidden"
          href="/dashboard"
        >
          <CircleUserIcon />
        </Link>
        <div className="flex items-center">
          <SlashIcon className="mx-2 size-3 shrink-0 rotate-[-25deg] text-slate-400 max-lg:hidden" />
          <OrganizationSwitcher />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <UserButton
          appearance={{
            elements: {
              rootBox: 'flex',
            },
          }}
        />
      </div>
    </div>
  )
}
