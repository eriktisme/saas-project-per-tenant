import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { siteConfig } from '@/config'
import { DeleteOrganizationDialog } from './DeleteOrganizationDialog'

export const DeleteOrganizationCard = () => {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle>Delete Organization</CardTitle>
        <CardDescription>
          Permanently remove your Organization and all of its contents from the{' '}
          {siteConfig.title} platform. This action is not reversible, so please
          continue with caution.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <DeleteOrganizationDialog />
      </CardFooter>
    </Card>
  )
}
