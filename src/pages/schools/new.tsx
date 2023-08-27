import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import SchoolForm from "src/schools/components/SchoolForm"
import { Suspense } from "react"

const NewSchoolPage = () => {
  const router = useRouter()

  return (
    <Layout title={"Create New School"}>
      <Suspense fallback={<div>Loading...</div>}>
        <SchoolForm
          submitText="Create School"
          onSubmit={async (schoolId) => {
            try {
              await router.push(Routes.DashboardPage())
            } catch (error: any) {
              console.error(error)
              return {
                error: error.toString(),
              }
            }
          }}
        />
      </Suspense>
    </Layout>
  )
}

NewSchoolPage.authenticate = true

export default NewSchoolPage
