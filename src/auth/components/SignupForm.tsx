import signup from "src/auth/mutations/signup"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { useState } from "react"
import { Gender } from "@prisma/client"
import { XCircleIcon } from "@heroicons/react/20/solid"
import {
  Title,
  Notification,
  Flex,
  Stack,
  Anchor,
  Button,
  TextInput,
  Checkbox,
  Group,
  Container,
  PasswordInput,
  Radio,
} from "@mantine/core"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: (id: number) => void
}

const initialValues = {
  email: "",
  name: "",
  phone: "",
  password: "",
  termsOfService: false,
  gender: Gender.MALE,
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
  const [loading, setLoading] = useState(false)
  const [showServerError, setShowServerError] = useState(false)
  const [showSignupError, setShowSignupError] = useState(false)
  const form = useForm({
    initialValues,
    validate,
  })

  async function handleSubmit(values: any) {
    try {
      setLoading(true)
      const user = await signupMutation(values)
      if (props.onSuccess && user) {
        props.onSuccess(user.id)
        setLoading(false)
      }
    } catch (error) {
      if (error.code === "P2002") {
        setShowSignupError(true)
        setLoading(false)
      } else {
        setShowServerError(true)
        setLoading(false)
      }
    }
  }

  return (
    <>
      {showSignupError && (
        <Notification
          onClose={() => setShowSignupError(false)}
          icon={<XCircleIcon />}
          className="right-0 w-2/3 md:w-1/2"
        >
          E-mail au namba ya simu imekwisha tumika, tafadhali tumia nyingine.
        </Notification>
      )}

      {showServerError && (
        <Notification
          onClose={() => setShowServerError(false)}
          icon={<XCircleIcon />}
          className="right-0 w-2/3 md:w-1/2"
        >
          Samahani, kuna tatizo katika server yetu, tafadhali jaribu tena baadae.
        </Notification>
      )}
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

            <Radio.Group
              name="gender"
              label="Gender"
              className="space-y-3"
              defaultValue={Gender.MALE}
              {...form.getInputProps("gender")}
            >
              <Group>
                <Radio value={Gender.MALE} label="Male" />
                <Radio value={Gender.FEMALE} label="Female" />
              </Group>
            </Radio.Group>

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
                <Button loading={loading} type="submit" disabled={!form.values["termsOfService"]}>
                  Submit
                </Button>
              </>
            </Group>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default SignupForm
