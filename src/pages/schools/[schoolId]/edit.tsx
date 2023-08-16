import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { UpdateSchoolSchema } from "src/schools/schemas"
import getSchool from "src/schools/queries/getSchool"
import updateSchool from "src/schools/mutations/updateSchool"
import SchoolForm from "src/schools/components/SchoolForm"

export const EditSchool = () => {
  const router = useRouter()
  const schoolId = useParam("schoolId", "number")
  const [school, { setQueryData }] = useQuery(
    getSchool,
    { id: schoolId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSchoolMutation] = useMutation(updateSchool)

  return (
    <>
      <Head>
        <title>Edit School {school.id}</title>
      </Head>

      <div>
        <h1>Edit School {school.id}</h1>
        <pre>{JSON.stringify(school, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <SchoolForm
            submitText="Update School"
            onSubmit={async (values) => {
              try {
                const updated = await updateSchoolMutation({
                  id: school.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowSchoolPage({ schoolId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  error: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditSchoolPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSchool />
      </Suspense>

      <p>
        <Link href={Routes.SchoolsPage()}>Schools</Link>
      </p>
    </div>
  )
}

EditSchoolPage.authenticate = true
EditSchoolPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSchoolPage
