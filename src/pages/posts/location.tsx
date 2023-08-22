import { Suspense } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouterQuery } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPosts from "src/posts/queries/getPosts"
import PostsListComponent, { PostsWithIncludes } from "src/posts/components/PostsList"

function generateLocationQuery(obj: any) {
  if (obj.hasOwnProperty("district")) {
    return {
      districtName: obj.district,
    }
  } else if (obj.hasOwnProperty("region")) {
    return {
      regionName: obj.region,
    }
  }
  return {
    wardName: obj.ward,
  }
}

function getLocationTitle(obj: any) {
  if (obj.hasOwnProperty("district")) {
    return `${obj.district} district`
  } else if (obj.hasOwnProperty("region")) {
    return `${obj.region} region`
  }
  return `${obj.ward} ward`
}

const ITEMS_PER_PAGE = 20
export const PostList = () => {
  const router = useRouter()
  const query = useRouterQuery()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      active: true,
      user: {
        currentSchool: {
          location: generateLocationQuery(query),
        },
      },
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
  const title = `Posts from ${getLocationTitle(query)}`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PostsListComponent
        goBack={goToPreviousPage}
        wentForMore={!!page}
        goNext={goToNextPage}
        hasMore={hasMore}
        posts={posts as PostsWithIncludes[]}
      />
    </>
  )
}

const PostsLocationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostList />
    </Suspense>
  )
}

PostsLocationPage.authenticate = true
PostsLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostsLocationPage
