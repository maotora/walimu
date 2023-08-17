import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import PostForm from "src/posts/components/PostForm"
import { Suspense } from "react"

const NewPostPage = () => {
  const router = useRouter()

  return (
    <Layout title={"Create New Post"}>
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm
          submitText="Create Post"
          onSubmit={async (postId) => {
            await router.push(Routes.ShowPostPage({ postId }))
          }}
        />
      </Suspense>
    </Layout>
  )
}

NewPostPage.authenticate = true

export default NewPostPage
