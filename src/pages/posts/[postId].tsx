import { Suspense } from "react"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPost from "src/posts/queries/getPost"
import PostView from "src/posts/components/PostView"
import { PostsWithIncludes } from "src/posts/components/PostsList"

export const Post = () => {
  const postId = useParam("postId", "number")
  const [post] = useQuery(getPost, { id: postId })

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <PostView post={post as PostsWithIncludes} />
    </>
  )
}

const ShowPostPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Post />
    </Suspense>
  )
}

ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
