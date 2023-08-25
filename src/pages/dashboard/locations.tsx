import getUserLocations from "src/user-locations/queries/getUserLocations"
import { Suspense } from "react"
import { useQuery } from "@blitzjs/rpc"
import Layout from "src/core/layouts/DashboardLayout"
import { useAuthenticatedSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import UserLocationsView, {
  UserLocationsWithIncludes,
} from "src/user-locations/components/UserLocationView"

function MyLocationsComponent() {
  const { userId } = useAuthenticatedSession()
  const [{ userLocations }] = useQuery(getUserLocations, {
    where: {
      userId,
    },
    include: {
      location: true,
    },
  })

  return userLocations.length > 0 ? (
    <UserLocationsView userLocations={userLocations as UserLocationsWithIncludes[]} />
  ) : (
    <div>
      <h2 className="mb-8 text-2xl font-bold"> No User Locations Found </h2>
      <Link href={Routes.NewUserLocationsPage()} className="text-blue-600">
        You can add more location preferences here
      </Link>
    </div>
  )
}

export default function MyLocationsPage() {
  return (
    <Layout>
      <Suspense fallback={"Loading..."}>
        <MyLocationsComponent />
      </Suspense>
    </Layout>
  )
}
