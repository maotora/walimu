import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateSubjectSchema } from "src/subjects/schemas"
import getSubject from "src/subjects/queries/getSubject"
import updateSubject from "src/subjects/mutations/updateSubject"
import { SubjectForm } from "src/subjects/components/SubjectForm"

export const EditSubject = () => {
  const router = useRouter()
  const subjectId = useParam("subjectId", "number")
  const [subject, { setQueryData }] = useQuery(
    getSubject,
    { id: subjectId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSubjectMutation] = useMutation(updateSubject)

  return (
    <>
      <Head>
        <title>Edit Subject {subject.id}</title>
      </Head>

      <div>
        <h1>Edit Subject {subject.id}</h1>
        <pre>{JSON.stringify(subject, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <SubjectForm
            submitText="Update Subject"
            schema={UpdateSubjectSchema}
            initialValues={subject}
            onSubmit={async (values) => {
              try {
                const updated = await updateSubjectMutation({
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowSubjectPage({ subjectId: updated.id }))
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

const EditSubjectPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSubject />
      </Suspense>

      <p>
        <Link href={Routes.SubjectsPage()}>Subjects</Link>
      </p>
    </div>
  )
}

EditSubjectPage.authenticate = true
EditSubjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSubjectPage
