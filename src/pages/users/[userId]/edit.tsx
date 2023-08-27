import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import DevStatus from "src/core/components/DevStatus"

import Layout from "src/core/layouts/Layout"
import { UpdateUserSchema } from "src/users/schemas"
import getUser from "src/users/queries/getUser"
import updateUser from "src/users/mutations/updateUser"
import { UserForm, FORM_ERROR } from "src/users/components/UserForm"

export const EditUser = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId! },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <Head>
        <title>Edit User {user.id}</title>
      </Head>

      <div>
        <h1>Edit User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <UserForm
            submitText="Update User"
            schema={UpdateUserSchema}
            initialValues={user}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserMutation({
                  ...values,
                })
                // await setQueryData(updated)
                await router.push(Routes.ShowUserPage({ userId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditUserPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DevStatus />
      </Suspense>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
