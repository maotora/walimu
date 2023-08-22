import { Suspense } from "react"
import Head from "next/head"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getPosts from "src/posts/queries/getPosts"
import PostsListComponent, { PostsWithIncludes } from "src/posts/components/PostsList"

const ITEMS_PER_PAGE = 20

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      active: true,
    },
    include: {
      user: {
        include: {
          currentSchool: {
            include: {
              location: true,
              levels: true,
            },
          },
        },
      },
      locations: {
        include: {
          location: true,
        },
      },
      postViewers: true,
      postWatchers: true,
      subjects: {
        include: {
          subject: true,
        },
      },
    },
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <PostsListComponent
      goBack={goToPreviousPage}
      goNext={goToNextPage}
      hasMore={hasMore}
      wentForMore={!!page}
      posts={posts as PostsWithIncludes[]}
    />
  )
}

const PostsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Posts</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </Layout>
  )
}

export default PostsPage
