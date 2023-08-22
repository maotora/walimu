import { LinkIcon } from "@heroicons/react/20/solid"
import { getTeachingSubjects, createPostTitle, createLocationName, formatItems } from "utils"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"
import { Prisma } from "@prisma/client"
import { useState, useEffect } from "react"
import { Routes } from "@blitzjs/next"
import { ListInfoProps, InfoList } from "src/users/components/UserView"
import { useMutation } from "@blitzjs/rpc"
import updateWatcher from "src/watchers/mutations/updateWatcher"
import { MyPostViewTypeWithIncludes } from "src/pages/dashboard/posts"

export type TeachingSubjectWithInclude = Prisma.TeachingSubjectGetPayload<{
  include: {
    subject: true
  }
}>

export default function MyPostView(props: { post: MyPostViewTypeWithIncludes }) {
  const { post } = props
  const { user, subjects } = post
  const { currentSchool } = user
  const schoolLocation = currentSchool?.location
  const router = useRouter()
  const [postInfo, setPostInfo] = useState<ListInfoProps[]>([])
  const [viewsCount, setViewsCount] = useState(0)
  const [actualViews, setActualViews] = useState(0)
  const [watcherLoading, setWatcherLoading] = useState(false)
  const [updateWatcherMutation] = useMutation(updateWatcher)

  async function handleApprovePair(watchId: number, paired: boolean) {
    setWatcherLoading(true)
    const updatedWatcher = await updateWatcherMutation({
      id: watchId,
      paired,
    })
    console.log({ updatedWatcher })
    setWatcherLoading(false)
  }

  useEffect(() => {
    const actualViewsCount = post.postViewers.reduce((acc, { count }) => {
      return (acc += count)
    }, 0)
    setViewsCount(post.postViewers.length)
    setActualViews(actualViewsCount)

    setPostInfo([
      {
        label: "Posted on:",
        value: post.createdAt.toLocaleDateString("sw"),
      },
      {
        label: "Author:",
        value: user.name,
      },
      {
        label: "Current School Name:",
        value: createPostTitle(post),
      },
      {
        label: "Current School Location:",
        value: createLocationName(schoolLocation),
      },
      {
        label: "Teaching subjects:",
        value: getTeachingSubjects(subjects),
      },
      {
        label: "Views Count",
        value: `Unique Views: ${viewsCount},  Repeating Views: ${actualViews}`,
      },
    ])
  }, [post])

  return (
    <>
      <dl className="mt-6 text-sm border-gray-200 border-y space-y-6 divide-y divide-gray-100 leading-4">
        {postInfo.map((info, idx) => (
          <InfoList key={idx} {...info} />
        ))}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between py-6 gap-x-6">
            <dt className="font-medium text-gray-900">Preferred Locations:</dt>
            <dd className="text-gray-900 font-base">
              <ul>
                {post.locations.map(({ location }) => (
                  <li key={location.id}> {createLocationName(location, true)} </li>
                ))}
              </ul>
              <div className="flex pt-6 border-t border-gray-100">
                <button
                  type="button"
                  className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
                  onClick={() => router.push(Routes.MyLocationsPage())}
                >
                  <span aria-hidden="true">+</span> Add Locations
                </button>
              </div>
            </dd>
          </div>
        </div>
      </dl>
      <div className="font-medium text-gray-900">Pair Request Information</div>
      <div className="text-gray-900 font-base">
        <ul>
          {post.postWatchers.map(({ id, paired, user }) => (
            <li key={id} className="py-6 border-gray-200 border-y space-y-4">
              <p>Name: {user.name}</p>
              <p>Current School: {createPostTitle(post)}</p>
              <p>Current School Type: {formatItems(user.currentSchool?.type || "N/A")}</p>
              <p>Current School Location: {createLocationName(user.currentSchool?.location)}</p>
              <Button
                color={paired ? "gray" : ""}
                leftIcon={
                  <LinkIcon className="flex-none w-6 h-6 pr-2 text-white" aria-hidden="true" />
                }
                loading={watcherLoading}
                onClick={() => handleApprovePair(id, !paired)}
              >
                {!paired ? "Approve Pair" : "Paired"}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
