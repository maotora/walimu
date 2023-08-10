import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getSubjects from "src/subjects/queries/getSubjects"

const ITEMS_PER_PAGE = 100

export const SubjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ subjects, hasMore }] = usePaginatedQuery(getSubjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <Link href={Routes.ShowSubjectPage({ subjectId: subject.id })}>{subject.name}</Link>
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

const SubjectsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Subjects</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSubjectPage()}>Create Subject</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SubjectsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default SubjectsPage
