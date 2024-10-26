'use client'

import {
  DeleteOrganizationCard,
  GeneralSettingsForm,
  GeneralSettingsFormSkeleton,
} from '@/features/settings/components'
import { useOrganization } from '@clerk/nextjs'

interface Props {
  //
}

export const SettingsPageTemplate = (_: Props) => {
  const { organization } = useOrganization()

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 pb-20 lg:p-14">
      <div className="min-w-[28rem] space-y-8">
        {organization ? (
          <GeneralSettingsForm name={organization.name} />
        ) : (
          <GeneralSettingsFormSkeleton />
        )}
        <DeleteOrganizationCard />
      </div>
    </div>
  )
}
