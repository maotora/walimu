import { Prisma } from "@prisma/client"
import { tailwindClassNames as classNames } from "utils"
import { UnstyledButton } from "@mantine/core"
import { getSchoolLocationName, createPostTitle, createLocationName } from "utils"
import Image from "next/image"
import Link from "next/link"

export type PostsWithIncludes = Prisma.PostGetPayload<{
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
    postWatchers: true
    subjects: {
      include: {
        subject: true
      }
    }
  }
}>

type PostsListType = {
  posts: PostsWithIncludes[]
  goBack: () => void
  goNext: () => void
  hasMore: boolean
  wentForMore: boolean
}

export default function PostsList(props: PostsListType) {
  const { goNext, goBack, hasMore, posts, wentForMore } = props

  return (
    <>
      <div className="py-24 bg-white sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Posts
            </h2>
            <p className="mt-2 text-lg text-gray-600 leading-8">
              Teachers all around the country whom you can pair with.
            </p>
            <div className="pt-10 mt-10 border-t border-gray-200 space-y-16 sm:mt-16 sm:pt-16">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between max-w-xl"
                >
                  <div className="flex items-center text-xs gap-x-4">
                    <time dateTime={post.createdAt.toDateString()} className="text-gray-500">
                      {post.createdAt.toDateString()}
                    </time>
                    <Link
                      href={`/posts/location/?district=${encodeURI(
                        getSchoolLocationName(post, "districtName")
                      )}`}
                      className="relative z-10 rounded-full bg-cyan-50 px-3 py-1.5 lowercase font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {getSchoolLocationName(post, "districtName", true)}
                    </Link>
                    <Link
                      href={`/posts/location/?ward=${encodeURI(
                        getSchoolLocationName(post, "wardName")
                      )}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 lowercase font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {getSchoolLocationName(post, "wardName")}
                    </Link>
                  </div>
                  <div className="relative group">
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-6 group-hover:text-gray-600">
                      <Link href={`/posts/${post.id}`}>
                        <span className="absolute inset-0" />
                        {createPostTitle(post)}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm font-medium text-gray-700 line-clamp-3 leading-6">
                      Can relocate to:
                    </p>
                    <ul>
                      {post.locations.map(({ location }, idx) => (
                        <li key={location.id}>
                          <p className="pl-5 mt-2 text-sm text-gray-600 line-clamp-3 leading-6">
                            {idx + 1}. {createLocationName(location, true)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative flex items-center mt-8 gap-x-4">
                    <Image
                      width={50}
                      height={50}
                      src={`/${post.user.gender}.jpg`}
                      alt={`User Avatar based on the ${post.user.gender} Gender`}
                      className="rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link href={`/users/${post.user.id}`}>
                          <span className="absolute inset-0" />
                          {post.user.name}
                        </Link>
                      </p>
                      <p className="text-gray-600">Teacher</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-2/4 mx-auto my-10">
        <UnstyledButton
          onClick={goBack}
          disabled={!wentForMore}
          className={classNames(
            wentForMore
              ? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300",
            `inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`
          )}
        >
          Back
        </UnstyledButton>

        <UnstyledButton
          onClick={goNext}
          disabled={!hasMore}
          className={classNames(
            hasMore
              ? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300",
            `inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`
          )}
        >
          Next
        </UnstyledButton>
      </div>
    </>
  )
}
