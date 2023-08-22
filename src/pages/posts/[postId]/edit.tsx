import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPost from "src/posts/queries/getPost"
import updatePost from "src/posts/mutations/updatePost"
import PostForm from "src/posts/components/PostForm"
import { PostsWithIncludes } from "src/posts/components/PostsList"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)

  return (
    <>
      <Head>
        <title>Edit Post {post.id}</title>
      </Head>

      <div>
        <h1>Edit Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PostForm
            submitText="Update Post"
            onSubmit={async (values) => {
              try {
                const updated = await updatePostMutation({
                  ...values,
                })
                await setQueryData(updated as PostsWithIncludes)
                await router.push(Routes.ShowPostPage({ postId: updated.id }))
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

const EditPostPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>

      <p>
        <Link href={Routes.PostsPage()}>Posts</Link>
      </p>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
