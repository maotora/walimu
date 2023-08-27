import { Suspense } from "react"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getSchool from "src/schools/queries/getSchool"
import SchoolInfo, { SchoolWithIncludes } from "src/schools/components/SchoolView"

export const School = () => {
  const schoolId = useParam("schoolId", "number")
  const [school] = useQuery(getSchool, { id: schoolId })

  return (
    <>
      <Head>
        <title>School {school.name}</title>
      </Head>

      <SchoolInfo school={school as SchoolWithIncludes} />
    </>
  )
}

const ShowSchoolPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <School />
      </Suspense>
    </div>
  )
}

ShowSchoolPage.authenticate = true
ShowSchoolPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSchoolPage
