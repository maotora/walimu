import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import {
  Flex,
  Stack,
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
  const form = useForm({
    validate,
    initialValues,
  })

  async function handleSubmit(values: any) {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { error: "Sorry, those credentials are invalid" }
      } else {
        return {
          error: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Container maw={500} mt={100}>
      <Title order={2} my={10}>
        Login
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={"md"}>
          <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps("email")} />

          <PasswordInput label="Password" {...form.getInputProps("password")} />

          <Button maw={120} type="submit">
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
  )
}

export default LoginForm
