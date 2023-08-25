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
import createPostLocations from "src/post-locations/mutations/createPostLocations"
import { useAuthenticatedSession } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import getPosts from "src/posts/queries/getPosts"
import { useRouterQuery } from "@blitzjs/next"

function PostLocationsComponent() {
  const router = useRouter()
  const [postLocationMutation] = useMutation(createPostLocations)
  const [loading, setLoading] = useState(false)
  const { userId } = useAuthenticatedSession()
  const { postId } = useRouterQuery()
  const form = useForm({ initialValues })
  const [{ posts }] = useQuery(getPosts, {
    where: {
      id: Number(postId),
      userId,
    },
  })
  const [post] = posts

  async function handleSubmit(values: locationTypes) {
    setLoading(true)
    await postLocationMutation({ ...values, postId: post?.id! })
    setLoading(false)
    await router.push(Routes.MyPostPage())
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack className="mx-auto" maw={600}>
        <LocationForm form={form} />
        <Button type="submit" loading={loading} className="w-full mx-auto my-6 lg:w-1/3">
          Add Post Location
        </Button>
      </Stack>
    </form>
  )
}

export default function NewPostLocationsPage() {
  return (
    <Layout>
      <Suspense>
        <PostLocationsComponent />
      </Suspense>
    </Layout>
  )
}
