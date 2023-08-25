import { LinkIcon, NoSymbolIcon } from "@heroicons/react/20/solid"
import { getTeachingSubjects, createPostTitle, createLocationName, formatItems } from "utils"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"
import { Prisma } from "@prisma/client"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
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
  const [pairRequest, setPairRequest] = useState<any[]>([])
  useEffect(() => {
    const actualViewsCount = post.postViewers.reduce((acc, { count }) => {
      return (acc += count)
    }, 0)
    setViewsCount(post.postViewers.length)
    setActualViews(actualViewsCount)

    setPostInfo([
      {
        label: "Posted on:",
        value: post.createdAt.toDateString(),
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

    setPairRequest(post.postWatchers)
  }, [post])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 leading-7">My Post</h2>
      <p className="mt-1 text-sm text-gray-500 leading-6">
        This is the post that you made, it will be publicily available until you meet a pair.
      </p>
      <dl className="mt-6 text-sm border-gray-200 border-y space-y-6 divide-y divide-gray-100 leading-4">
        {postInfo.map((info, idx) => (
          <InfoList key={idx} {...info} />
        ))}
        <div className="w-full lg:w-3/4">
          <div className="flex py-6 gap-x-6">
            <dt className="w-1/3 font-medium text-gray-900">Preferred Locations:</dt>
            <dd className="w-2/3 text-gray-900 font-base">
              <ul>
                {post.locations.map(({ location }) => (
                  <li className="pb-4" key={location.id}>
                    {" "}
                    {createLocationName(location, true)}{" "}
                  </li>
                ))}
              </ul>
              <div className="flex pt-6 border-t border-gray-100">
                <button
                  type="button"
                  className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
                  onClick={() => router.push(Routes.NewPostLocationsPage({ postId: post.id }))}
                >
                  <span aria-hidden="true">+</span> Add Locations
                </button>
              </div>
            </dd>
          </div>
        </div>
        <div>
          <h2 className="mt-12 text-base font-semibold text-gray-900 leading-7">
            Pair Request Information
          </h2>
          <p className="mt-1 mb-6 text-sm text-gray-500 leading-6">
            This is the post that you made, it will be publicily available until you meet a pair.
          </p>
          <div className="text-gray-900 font-base">
            {pairRequest.map(({ createdAt, id, paired, user, approved }) => {
              if (approved) {
                const [schoolName, schoolType, schoolLocation, requesterName, teachingSubjects] = [
                  createPostTitle(post),
                  formatItems(user.currentSchool?.type || "N/A"),
                  createLocationName(user.currentSchool?.location),
                  user.name,
                  getTeachingSubjects(user.posts[0]?.subjects!) || "N/A",
                ]
                return (
                  <PostInfo
                    key={id}
                    pairedData={{
                      createdAt,
                      id,
                      pairRequest,
                      setPairRequest,
                      paired,
                      schoolName,
                      schoolType,
                      schoolLocation,
                      requesterName,
                      teachingSubjects,
                    }}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      </dl>
    </div>
  )
}

export type ListPostsProps = {
  pairedData: {
    requesterName: string
    schoolName: string
    createdAt: Date
    schoolType: string
    schoolLocation: string
    paired: boolean | null
    id: number
    teachingSubjects: string
    pairRequest: any[]
    setPairRequest: Dispatch<SetStateAction<any>>
  }
}

export function PostInfo(props: ListPostsProps) {
  const {
    paired,
    id,
    schoolName,
    teachingSubjects,
    requesterName,
    schoolType,
    schoolLocation,
    createdAt,
    pairRequest,
    setPairRequest,
  } = props.pairedData
  const [updateWatcherMutation] = useMutation(updateWatcher)
  const [watcherLoading, setWatcherLoading] = useState(false)
  const [userPaired, setUserPaired] = useState(false)

  useEffect(() => {
    setUserPaired(!!paired)
  }, [paired])

  async function handleApprovePair(watchId: number, paired: boolean) {
    try {
      setWatcherLoading(true)
      await updateWatcherMutation({
        id: watchId,
        paired,
      })
      setWatcherLoading(false)
      setUserPaired(paired)
    } catch (err) {
      console.log(err)
      setWatcherLoading(false)
      setUserPaired(paired)
    }
  }

  async function handleRejectPair(watchId: number) {
    try {
      setWatcherLoading(true)
      const rejectedPair = await updateWatcherMutation({
        id: watchId,
        approved: false,
        paired: false,
      })

      const newPairs = pairRequest.filter(
        (pairRequest) => pairRequest && pairRequest.id !== rejectedPair.id
      )
      setPairRequest(newPairs)

      setWatcherLoading(false)
      setUserPaired(false)
    } catch (err) {
      console.log(err)
      setWatcherLoading(false)
      setUserPaired(false)
    }
  }

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">Request Date:</dt>
        <dd className="w-2/3 text-gray-900 font-base">{createdAt.toDateString()}</dd>
      </div>

      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">Requester Name:</dt>
        <dd className="w-2/3 text-gray-900 font-base">{requesterName}</dd>
      </div>

      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">Current School:</dt>
        <dd className="w-2/3 text-gray-900 font-base">{schoolName}</dd>
      </div>

      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">School Type:</dt>
        <dd className="w-2/3 text-gray-900 font-base">{schoolType}</dd>
      </div>

      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">School Location</dt>
        <dd className="w-2/3 text-gray-900 font-base">{schoolLocation}</dd>
      </div>

      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <dt className="w-1/3 font-medium text-gray-900">Teaching Subjects</dt>
        <dd className="w-2/3 text-gray-900 font-base">{teachingSubjects}</dd>
      </div>
      <div className="flex py-6 border-t border-gray-200 gap-x-6 ">
        <Button
          color={userPaired ? "gray" : ""}
          leftIcon={<LinkIcon className="flex-none w-6 h-6 pr-2 text-white" aria-hidden="true" />}
          loading={watcherLoading}
          onClick={() => handleApprovePair(id, !userPaired)}
        >
          {!userPaired ? "Approve Pair" : "Paired"}
        </Button>

        <Button
          color="red"
          leftIcon={
            <NoSymbolIcon className="flex-none w-6 h-6 pr-2 text-white" aria-hidden="true" />
          }
          loading={watcherLoading}
          onClick={() => handleRejectPair(id)}
        >
          Reject Pair
        </Button>
      </div>
    </div>
  )
}
