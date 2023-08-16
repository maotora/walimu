import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getSchool from "src/schools/queries/getSchool"
import deleteSchool from "src/schools/mutations/deleteSchool"

export const School = () => {
  const router = useRouter()
  const schoolId = useParam("schoolId", "number")
  const [deleteSchoolMutation] = useMutation(deleteSchool)
  const [school] = useQuery(getSchool, { id: schoolId })

  return (
    <>
      <Head>
        <title>School {school.id}</title>
      </Head>

      <div>
        <h1>School {school.id}</h1>
        <pre>{JSON.stringify(school, null, 2)}</pre>

        <Link href={Routes.EditSchoolPage({ schoolId: school.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSchoolMutation({ id: school.id })
              await router.push(Routes.SchoolsPage())
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

const ShowSchoolPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SchoolsPage()}>Schools</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <School />
      </Suspense>
    </div>
  )
}

ShowSchoolPage.authenticate = true
ShowSchoolPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSchoolPage
