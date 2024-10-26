'use client'

import { useSignIn } from '@clerk/nextjs'
import { z } from 'zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
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
import type { ForgotPasswordStatus } from '../types'

const FormSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof FormSchema>

interface Props {
  setForgotPasswordStatus: (value: ForgotPasswordStatus) => void
}

export const ForgotPasswordForm = (props: Props) => {
  const [isPending, startTransition] = useTransition()

  const { isLoaded, signIn } = useSignIn()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleCreatePasswordReset = async (values: FormValues) => {
    if (!isLoaded) return

    try {
      await signIn.create({
        identifier: values.email,
        strategy: 'reset_password_email_code',
      })

      props.setForgotPasswordStatus('verifying')
    } catch (e) {
      console.error('Failed to create password reset')

      return Promise.reject(e)
    }
  }

  const onResetPassword = async (values: FormValues) => {
    if (!isLoaded) return

    startTransition(() => {
      handleCreatePasswordReset(values)
        .then(() => {
          //
        })
        .catch((_) => {
          //
        })
    })
  }

  return (
    <Card className="gap-8 p-0 pt-8 lg:w-[25rem]">
      <CardHeader className="items-stretch px-10 text-center">
        <CardTitle>Forgot password?</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onResetPassword)}
            className="flex flex-col items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...field}
                    />
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
      <CardFooter className="justify-center gap-1 bg-slate-50 px-10 py-4">
        <span>Already have an account?</span>
        <Link href="/login" className="font-medium">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  )
}
