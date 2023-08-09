import signup from "src/auth/mutations/signup"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import {
  Title,
  Flex,
  Stack,
  Anchor,
  Button,
  TextInput,
  Checkbox,
  Group,
  Container,
  PasswordInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

const initialValues = {
  email: "",
  name: "",
  phone: "",
  password: "",
  termsOfService: false,
}

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  phone: (value: string) =>
    value.length >= 10 && value.length <= 16 ? null : "Phone number must be 10 - 16 long",
  name: (value: string) => (value.length > 5 ? null : "Name must be at least 5 characters"),
  password: (value: string) => (value.length > 8 ? null : "Password must be at least 8 characters"),
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const form = useForm({
    initialValues,
    validate,
  })

  function handleSubmit(values: any) {
    signupMutation(values)
    if (props.onSuccess) {
      props.onSuccess()
    }
  }

  return (
    <Container maw={500} mt={100}>
      <Title order={2} my={10}>
        Create an Account
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={"md"}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            withAsterisk
            placeholder="Your Password"
            {...form.getInputProps("password")}
          />

          <TextInput
            withAsterisk
            label="Phone"
            placeholder="+255 600 100 000"
            {...form.getInputProps("phone")}
          />

          <Flex justify="space-between" align="flex-end" wrap="wrap">
            <Checkbox
              mt="md"
              label="I agree with terms & conditions."
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />

            <Anchor component={Link} href="/auth/login" fz={"sm"}>
              Login in stead?
            </Anchor>
          </Flex>

          <Group position="right" mt="md">
            <>
              <Button type="submit" disabled={!form.values["termsOfService"]}>
                Submit
              </Button>
            </>
          </Group>
        </Stack>
      </form>
    </Container>
  )
}

export default SignupForm
