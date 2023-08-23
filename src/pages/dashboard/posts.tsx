import { Suspense } from "react"
import Head from "next/head"
import MyPostView from "src/posts/components/MyPostView"
import { useAuthenticatedSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import Layout from "src/core/layouts/DashboardLayout"
import getPosts from "src/posts/queries/getPosts"
import { useRouter } from "next/router"
import { Button } from "@mantine/core"
import { Routes } from "@blitzjs/next"
import { Prisma } from "@prisma/client"

export type MyPostViewTypeWithIncludes = Prisma.PostGetPayload<{
  include: {
    user: {
      include: {
        currentSchool: {
          include: {
            location: true
            levels: true
          }
        }
      }
    }
    locations: {
      include: {
        location: true
      }
    }
    postViewers: true
    postWatchers: {
      include: {
        user: {
          include: {
            currentSchool: {
              include: {
                location: true
                levels: true
              }
            }
            posts: {
              include: {
                subjects: {
                  include: {
                    subject: true
                  }
                }
              }
            }
          }
        }
      }
    }
    subjects: {
      include: {
        subject: true
      }
    }
  }
}>

const ITEMS_PER_PAGE = 20

function MyPostComponent() {
  const router = useRouter()
  const { userId } = useAuthenticatedSession()
  const page = Number(router.query.page) || 0
  const [{ posts }] = useQuery(getPosts, {
    where: {
      active: true,
      userId,
    },
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
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
      postWatchers: {
        include: {
          user: {
            include: {
              currentSchool: {
                include: {
                  location: true,
                  levels: true,
                },
              },
              posts: {
                include: {
                  subjects: {
                    include: {
                      subject: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      subjects: {
        include: {
          subject: true,
        },
      },
    },
  })
  const [post] = posts

  return post ? (
    <MyPostView post={post as MyPostViewTypeWithIncludes} />
  ) : (
    <div className="flex w-full h-full">
      <div className="flex flex-col space-y-8">
        <h2>You don't have any post yet, please click button below to add a new post</h2>
        <div className="flex justify-center">
          <Button onClick={async () => await router.push(Routes.NewPostPage())}> Add Post </Button>
        </div>
      </div>
    </div>
  )
}

export default function MyPostPage() {
  return (
    <Layout>
      <Head>
        <title>My Post</title>
      </Head>

      <Suspense fallback={"Loading..."}>
        <MyPostComponent />
      </Suspense>
    </Layout>
  )
}
