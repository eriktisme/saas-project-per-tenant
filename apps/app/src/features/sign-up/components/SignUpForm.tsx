'use client'

import { useSignUp } from '@clerk/nextjs'
import { z } from 'zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import type { SignUpStatus } from '@/features/sign-up/types'
import { InputPassword } from '@/components/ui/input-password'

const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(0),
  lastName: z.string().min(0),
  password: z.string().min(0),
})

type FormValues = z.infer<typeof FormSchema>

interface Props {
  setSignUpStatus: (value: SignUpStatus) => void
}

export const SignUpForm = (props: Props) => {
  const [isPending, startTransition] = useTransition()

  const { isLoaded, signUp } = useSignUp()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  })

  const handleCreatingUser = async (values: FormValues) => {
    if (!isLoaded) return

    try {
      await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      props.setSignUpStatus('verifying')
    } catch (e) {
      console.error('Failed to create user')

      return Promise.reject(e)
    }
  }

  const onSignUp = async (values: FormValues) => {
    if (!isLoaded) return

    startTransition(() => {
      handleCreatingUser(values)
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
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignUp)}
            className="flex flex-col items-stretch gap-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword autoComplete="password" {...field} />
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
