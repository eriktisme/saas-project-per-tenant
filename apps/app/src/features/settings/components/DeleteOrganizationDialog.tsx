'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useTransition } from 'react'
import { useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const DeleteOrganizationDialog = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const { isLoaded, organization } = useOrganization()

  const handleDeletingOrganization = async () => {
    if (!isLoaded) {
      return
    }

    await organization?.destroy()
  }

  const onDeleteOrganization = async () => {
    startTransition(() => {
      handleDeletingOrganization().then(() => {
        router.refresh()
        router.push('/dashboard')
      })
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          Delete Workspace
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            This will permanently delete {organization?.name} and all its date.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              isLoading={isPending}
              onClick={async () => {
                await onDeleteOrganization()
              }}
              variant="destructive"
              className="w-full"
            >
              I understand the consequences – delete this workspace!
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
