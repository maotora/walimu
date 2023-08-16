import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <div className="my-24">
        <SignupForm onSuccess={(id: number) => router.push(Routes.ShowUserPage({ userId: id }))} />
      </div>
    </Layout>
  )
}

export default SignupPage
