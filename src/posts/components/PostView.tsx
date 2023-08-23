import { getTeachingSubjects, createPostTitle, createLocationName } from "utils"
import { Button } from "@mantine/core"
import { Prisma } from "@prisma/client"
import { useState, useEffect } from "react"
import { PostsWithIncludes } from "./PostsList"
import { ListInfoProps, InfoList } from "src/users/components/UserView"
import { EyeIcon, LinkIcon } from "@heroicons/react/20/solid"
import { invoke, useMutation } from "@blitzjs/rpc"
import createViewer from "src/viewers/mutations/createViewer"
import createWatcher from "src/watchers/mutations/createWatcher"
import { useAuthenticatedSession } from "@blitzjs/auth"
import getPost from "src/posts/queries/getPost"

export type TeachingSubjectWithInclude = Prisma.TeachingSubjectGetPayload<{
  include: {
    subject: true
  }
}>
export default function PostViews(props: { post: PostsWithIncludes }) {
  const { post } = props
  const { user, subjects } = post
  const { currentSchool } = user
  const schoolLocation = currentSchool?.location
  const [postInfo, setPostInfo] = useState<ListInfoProps[]>([])
  const [viewerMutation] = useMutation(createViewer)
  const [watcherMutation] = useMutation(createWatcher)
  const [viewsCount, setViewsCount] = useState(0)
  const [watcherCount, setWatcherCount] = useState(0)
  const { userId } = useAuthenticatedSession()
  const [watcherLoading, setWatcherLoading] = useState(false)
  const [disablePair, setDisablePair] = useState(false)
  const [alreadyPaired, setAlreadyPaired] = useState(false)

  useEffect(() => {
    async function addViews() {
      if (userId !== user.id) {
        const views = await viewerMutation({
          postId: post.id,
          userId,
        })

        setViewsCount(views.count)
      }
      setViewsCount(post.postViewers.length)
    }
    const approvedWatchers = post.postWatchers.filter((watcher) => {
      return watcher && watcher.approved
    })

    const pairedBefore = post.postWatchers.filter(
      (watching) => watching && watching.userId === userId
    )
    setAlreadyPaired(pairedBefore.length ? true : false)

    setDisablePair(userId === user.id)
    setWatcherCount(approvedWatchers.length)

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
    ])
    addViews().catch((err) => {
      console.log(err)
    })
  }, [post])

  async function handleAddPair() {
    setWatcherLoading(true)
    await watcherMutation({ userId, postId: post.id })
    const updatedPost = (await invoke(getPost, {
      id: post.id,
    })) as PostsWithIncludes

    setWatcherCount(updatedPost.postWatchers.length)
    setWatcherLoading(false)
    setAlreadyPaired(true)
  }

  return (
    <>
      <div className="px-4">
        <h2 className="text-base font-semibold text-gray-900 leading-7">Post View</h2>
        <p className="mt-1 text-sm text-gray-500 leading-6">
          See the basic information about this teacher actively looking for a transfer.
        </p>
      </div>
      <div className="px-4">
        <dl className="mt-6 text-sm border-gray-200 border-y space-y-6 divide-y divide-gray-100 leading-4">
          {postInfo.map((info, idx) => (
            <InfoList center={true} key={idx} {...info} />
          ))}
          <div className="w-full mx-auto lg:w-3/4">
            <div className="flex py-6 gap-x-6">
              <dt className="w-1/3 font-medium text-gray-900">Preferred Locations:</dt>
              <dd className="w-2/3 text-gray-900 font-base">
                <ul>
                  {post.locations.map(({ location }) => (
                    <li key={location.id}> {createLocationName(location, true)} </li>
                  ))}
                </ul>
              </dd>
            </div>
          </div>
        </dl>
        <div className="flex justify-center w-2/3 mx-auto my-8">
          <div className="flex flex-row w-2/3">
            <EyeIcon className="flex-none w-6 h-6 pr-2 text-blue-600" aria-hidden="true" />
            <span>{viewsCount} Views</span>
          </div>
          <div className="flex flex-row w-2/3">
            <Button
              color={alreadyPaired ? "gray" : ""}
              disabled={disablePair}
              loading={watcherLoading}
              onClick={handleAddPair}
              leftIcon={
                <LinkIcon className="flex-none w-6 h-6 pr-2 text-white" aria-hidden="true" />
              }
            >
              {watcherCount} {alreadyPaired ? "Pair Request Sent" : "Pair Request"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
