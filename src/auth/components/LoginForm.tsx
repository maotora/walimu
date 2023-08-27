import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { useState } from "react"
import { XCircleIcon } from "@heroicons/react/20/solid"
import login from "src/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import {
  Flex,
  Stack,
  Notification,
  Anchor,
  Button,
  TextInput,
  Title,
  Container,
  PasswordInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const initialValues = {
  email: "",
  password: "",
}

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  password: (value: string) => (value.length > 8 ? null : "Password must be at least 8 characters"),
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [loading, setLoading] = useState(false)
  const [showServerError, setShowServerError] = useState(false)
  const [showLoginError, setShowLoginError] = useState(false)
  const form = useForm({
    validate,
    initialValues,
  })

  async function handleSubmit(values: any) {
    try {
      setLoading(true)
      const user = await loginMutation(values)
      props.onSuccess?.(user)
      setLoading(false)
      setShowLoginError(false)
      setShowServerError(false)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        setLoading(false)
        setShowLoginError(true)
        return { error: "Sorry, those credentials are invalid" }
      } else {
        setLoading(false)
        setShowServerError(true)
        return {
          error: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <>
      {" "}
      {showServerError && (
        <Notification
          onClose={() => setShowServerError(false)}
          color="red"
          icon={<XCircleIcon />}
          className="right-0 w-2/3 md:w-1/2"
        >
          Samahani, kuna tatizo katika server yetu, tafadhali jaribu tena baadae.
        </Notification>
      )}
      {showLoginError && (
        <Notification
          onClose={() => setShowLoginError(false)}
          icon={<XCircleIcon />}
          className="right-0 w-2/3 md:w-1/2"
          color="red"
        >
          Umekosea taarifa zako, tafadhali ingiza tena.
        </Notification>
      )}
      <Container maw={500} mt={100}>
        <Title order={2} my={10}>
          Login
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing={"md"}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput label="Password" {...form.getInputProps("password")} />

            <Button loading={loading} maw={120} type="submit">
              Login
            </Button>
          </Stack>
        </form>

        <Flex justify="space-between" align="flex-end" wrap="wrap" mt={10}>
          <Anchor fz="sm" component={Link} href={Routes.ForgotPasswordPage()}>
            Forgot your password?
          </Anchor>
          <Anchor fz="sm" component={Link} href={Routes.SignupPage()}>
            Sign Up
          </Anchor>
        </Flex>
      </Container>
    </>
  )
}

export default LoginForm
