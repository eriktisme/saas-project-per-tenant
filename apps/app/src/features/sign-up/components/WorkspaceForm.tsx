import { z } from 'zod'
import { useTransition } from 'react'
import { useOrganizationList } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z.string().min(0),
})

type FormValues = z.infer<typeof FormSchema>

export const WorkspaceForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const { createOrganization, isLoaded, setActive } = useOrganizationList()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCreatingWorkspace = async (values: FormValues) => {
    if (!isLoaded) {
      return
    }

    try {
      const organization = await createOrganization({ name: values.name })

      await setActive({ organization })
    } catch (e) {
      console.error('Failed to create workspace', e)
    }
  }

  const onCreateWorkspace = async (values: FormValues) => {
    startTransition(() => {
      handleCreatingWorkspace(values)
        .then(() => {
          router.push('/dashboard')
        })
        .catch(() => {
          //
        })
    })
  }

  return (
    <Card className="gap-8 p-0 pt-8 lg:w-[25rem]">
      <CardHeader className="items-stretch px-10 text-center">
        <CardTitle>Welcome to {siteConfig.title}</CardTitle>
        <CardDescription>Set up your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCreateWorkspace)}
            className="flex flex-col items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button isLoading={isPending} type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
