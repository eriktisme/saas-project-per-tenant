'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useSignUp } from '@clerk/nextjs'
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
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import type { SignUpStatus } from '@/features/sign-up/types'

const FormSchema = z.object({
  code: z.string().min(0),
})

type FormValues = z.infer<typeof FormSchema>

interface Props {
  setSignUpStatus: (value: SignUpStatus) => void
}

export const VerifyForm = (props: Props) => {
  const { isLoaded, setActive, signUp } = useSignUp()

  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  })

  const handleVerifying = async (values: FormValues) => {
    if (!isLoaded || !signUp) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })

        props.setSignUpStatus('creating-workspace')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const onVerify = async (values: FormValues) => {
    startTransition(() => {
      handleVerifying(values)
    })
  }

  return (
    <Card className="gap-8 p-0 pt-8 lg:w-[25rem]">
      <CardHeader className="items-stretch px-10 text-center">
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the verification code sent to your email {signUp?.emailAddress}.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onVerify)}
            className="flex flex-col items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex items-stretch justify-center space-y-0">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
