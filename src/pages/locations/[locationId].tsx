import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getLocation from "src/locations/queries/getLocation"
import deleteLocation from "src/locations/mutations/deleteLocation"

export const Location = () => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const [location] = useQuery(getLocation, { id: locationId })

  return (
    <>
      <Head>
        <title>Location {location.id}</title>
      </Head>

      <div>
        <h1>Location {location.id}</h1>
        <pre>{JSON.stringify(location, null, 2)}</pre>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLocationMutation({ id: location.id })
              await router.push(Routes.LocationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowLocationPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.LocationsPage()}>Locations</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Location />
      </Suspense>
    </div>
  )
}

ShowLocationPage.authenticate = true
ShowLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLocationPage
