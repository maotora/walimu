import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreatePostSchema } from "src/posts/schemas"
import createPost from "src/posts/mutations/createPost"
import { PostForm, FORM_ERROR } from "src/posts/components/PostForm"
import { Suspense } from "react"

const NewPostPage = () => {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)

  return (
    <Layout title={"Create New Post"}>
      <h1>Create New Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm
          submitText="Create Post"
          schema={CreatePostSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const post = await createPostMutation(values)
              await router.push(Routes.ShowPostPage({ postId: post.id }))
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
        <Link href={Routes.PostsPage()}>Posts</Link>
      </p>
    </Layout>
  )
}

NewPostPage.authenticate = true

export default NewPostPage
