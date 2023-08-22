import { Suspense } from "react"
import Layout from "src/core/layouts/DashboardLayout"
import UserView from "src/users/components/UserView"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import Head from "next/head"
import { UserWithIncludes } from "src/users/components/UserView"
import SchoolInfo from "src/schools/components/SchoolView"

function Dashboard() {
  const [user] = useQuery(getCurrentUser, null)

  return (
    <>
      <UserView user={user as UserWithIncludes} />
      <SchoolInfo user={user as UserWithIncludes} />
    </>
  )
}

const DashboardPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </Layout>
  )
}

export default DashboardPage
