import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getSubject from "src/subjects/queries/getSubject"
import deleteSubject from "src/subjects/mutations/deleteSubject"

export const Subject = () => {
  const router = useRouter()
  const subjectId = useParam("subjectId", "number")
  const [deleteSubjectMutation] = useMutation(deleteSubject)
  const [subject] = useQuery(getSubject, { id: subjectId })

  return (
    <>
      <Head>
        <title>Subject {subject.id}</title>
      </Head>

      <div>
        <h1>Subject {subject.id}</h1>
        <pre>{JSON.stringify(subject, null, 2)}</pre>

        <Link href={Routes.EditSubjectPage({ subjectId: subject.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSubjectMutation({ id: subject.id })
              await router.push(Routes.SubjectsPage())
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

const ShowSubjectPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SubjectsPage()}>Subjects</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Subject />
      </Suspense>
    </div>
  )
}

ShowSubjectPage.authenticate = true
ShowSubjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSubjectPage
