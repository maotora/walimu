import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getSchools from "src/schools/queries/getSchools"
import DevStatus from "src/core/components/DevStatus"

const ITEMS_PER_PAGE = 100

export const SchoolsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ schools, hasMore }] = usePaginatedQuery(getSchools, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            <Link href={Routes.ShowSchoolPage({ schoolId: school.id })}>{school.name}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SchoolsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Schools</title>
      </Head>

      <Suspense fallback="Loading...">
        <DevStatus />
      </Suspense>
    </Layout>
  )
}

export default SchoolsPage
