'use client'

import { useSignIn } from '@clerk/nextjs'
import { z } from 'zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
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
import { siteConfig } from '@/config'
import { InputPassword } from '@/components/ui/input-password'

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(0),
})

type FormValues = z.infer<typeof FormSchema>

export const SignInForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const { isLoaded, setActive, signIn } = useSignIn()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async (values: FormValues) => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })

        router.push('/dashboard')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (e) {
      console.error('Failed to sign in')

      return Promise.reject(e)
    }
  }

  const onSignIn = async (values: FormValues) => {
    if (!isLoaded) return

    startTransition(() => {
      handleSignIn(values)
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
        <CardTitle>Sign in to {siteConfig.title}</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignIn)}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Password</span>
                    <span>
                      <Link
                        href="/forgot-password"
                        className="text-indigo-600 hover:text-indigo-400"
                      >
                        Forgot password?
                      </Link>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <InputPassword autoComplete="current-password" {...field} />
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
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span>Don't have an account? </span>
        <Link href="/sign-up" className="font-medium">
          Sign up
        </Link>
      </CardFooter>
    </Card>
  )
}
