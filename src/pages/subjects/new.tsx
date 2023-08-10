import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateSubjectSchema } from "src/subjects/schemas"
import createSubject from "src/subjects/mutations/createSubject"
import { SubjectForm, FORM_ERROR } from "src/subjects/components/SubjectForm"
import { Suspense } from "react"

const NewSubjectPage = () => {
  const router = useRouter()
  const [createSubjectMutation] = useMutation(createSubject)

  return (
    <Layout title={"Create New Subject"}>
      <h1>Create New Subject</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SubjectForm
          submitText="Create Subject"
          schema={CreateSubjectSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const subject = await createSubjectMutation(values)
              await router.push(Routes.ShowSubjectPage({ subjectId: subject.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.SubjectsPage()}>Subjects</Link>
      </p>
    </Layout>
  )
}

NewSubjectPage.authenticate = true

export default NewSubjectPage
