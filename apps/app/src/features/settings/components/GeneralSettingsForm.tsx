'use client'

import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@clerk/nextjs'

const FormSchema = z.object({
  name: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

interface Props {
  name: string
}

export const GeneralSettingsForm = (props: Props) => {
  const [isPending, startTransition] = useTransition()

  const { isLoaded, organization } = useOrganization()

  const form = useForm<FormValues>({
    defaultValues: {
      name: props.name,
    },
  })

  const handleUpdatingOrganization = async (values: FormValues) => {
    if (!isLoaded) {
      return
    }

    await organization?.update({
      name: values.name,
    })
  }

  const onSaveSettings = async (values: FormValues) => {
    startTransition(() => {
      handleUpdatingOrganization(values)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaveSettings)}>
        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. Acme" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={!form.formState.isValid}
              isLoading={isPending}
              type="submit"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export const GeneralSettingsFormSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Label>Name</Label>
        <Skeleton className="mt-2 h-10 w-full" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
