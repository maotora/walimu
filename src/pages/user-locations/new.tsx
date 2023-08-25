import { useForm } from "@mantine/form"
import { Suspense, useState } from "react"
import { Button, Stack } from "@mantine/core"
import { Routes } from "@blitzjs/next"
import {
  LocationForm,
  locationTypes,
  locationInitialValues as initialValues,
} from "src/locations/components/LocationForm"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import createUserLocation from "src/user-locations/mutations/createUserLocation"
import { useAuthenticatedSession } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"

function UserLocationsComponent() {
  const router = useRouter()
  const [userLocationMutation] = useMutation(createUserLocation)
  const [loading, setLoading] = useState(false)
  const { userId } = useAuthenticatedSession()
  const form = useForm({
    initialValues,
  })

  async function handleSubmit(values: locationTypes) {
    setLoading(true)
    await userLocationMutation({ ...values, userId })
    setLoading(false)
    await router.push(Routes.MyLocationsPage())
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack className="mx-auto" maw={600}>
        <LocationForm form={form} />
        <Button type="submit" loading={loading} className="w-full mx-auto my-6 lg:w-1/3">
          Add Preferred Location
        </Button>
      </Stack>
    </form>
  )
}

export default function NewUserLocationsPage() {
  return (
    <Layout>
      <Suspense>
        <UserLocationsComponent />
      </Suspense>
    </Layout>
  )
}
