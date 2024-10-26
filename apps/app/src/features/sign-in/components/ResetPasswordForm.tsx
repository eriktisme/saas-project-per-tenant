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
import { useRouter } from 'next/navigation'
import { InputPassword } from '@/components/ui/input-password'

const FormSchema = z.object({
  code: z.string(),
  password: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

interface Props {
  //
}

export const ResetPasswordForm = (_: Props) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const { isLoaded, setActive, signIn } = useSignIn()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
      password: '',
    },
  })

  const handlePasswordReset = async (values: FormValues) => {
    if (!isLoaded) return

    try {
      const result = await signIn.attemptFirstFactor({
        code: values.code,
        password: values.password,
        strategy: 'reset_password_email_code',
      })

      if (result.status !== 'complete') {
        return
      }

      await setActive({ session: result.createdSessionId })

      router.push('/dashboard')
    } catch (e) {
      console.error('Failed to create password reset')

      return Promise.reject(e)
    }
  }

  const onResetPassword = async (values: FormValues) => {
    if (!isLoaded) return

    startTransition(() => {
      handlePasswordReset(values)
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <InputPassword autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button isLoading={isPending} type="submit" className="w-full">
                Reset your password
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
