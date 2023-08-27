import { Suspense } from "react"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import UserView from "src/users/components/UserView"

import Layout from "src/core/layouts/Layout"
import getUser from "src/users/queries/getUser"
import { UserWithIncludes } from "src/users/components/UserView"

export const UserPane = () => {
  const userId = useParam("userId", "number")
  const [user] = useQuery(getUser, { id: userId! })

  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div className="m-4 md:m-24">
        <UserView user={user as UserWithIncludes} />
      </div>
    </>
  )
}

const ShowUserPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPane />
    </Suspense>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
