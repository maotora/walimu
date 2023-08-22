import {
  getTeachingSubjects,
  formatItems,
  getSchoolLocationName,
  createPostTitle,
  createLocationName,
} from "utils"
import { Button } from "@mantine/core"
import { Prisma } from "@prisma/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { PostsWithIncludes } from "./PostsList"
import { ListInfoProps, InfoList } from "src/users/components/UserView"
import { EyeIcon, LinkIcon } from "@heroicons/react/20/solid"
import { invoke, useMutation } from "@blitzjs/rpc"
import createViewer from "src/viewers/mutations/createViewer"
import createWatcher from "src/watchers/mutations/createWatcher"
import { useAuthenticatedSession } from "@blitzjs/auth"
import getPost from "src/posts/queries/getPost"

type PostsListType = {
  post: PostsWithIncludes
}

export type TeachingSubjectWithInclude = Prisma.TeachingSubjectGetPayload<{
  include: {
    subject: true
  }
}>

export function PostView(props: PostsListType) {
  const { post } = props

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto">
          <article key={post.id} className="flex flex-col items-start justify-between max-w-xl">
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
                href={`/posts/location/?ward=${encodeURI(getSchoolLocationName(post, "wardName"))}`}
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
        </div>
      </div>
    </div>
  )
}

export default function PostViews(props: { post: PostsWithIncludes }) {
  const { post } = props
  const { user, subjects } = post
  const { currentSchool } = user
  const schoolLocation = currentSchool?.location
  const router = useRouter()
  const [postInfo, setPostInfo] = useState<ListInfoProps[]>([])
  const [viewerMutation] = useMutation(createViewer)
  const [watcherMutation] = useMutation(createWatcher)
  const [viewsCount, setViewsCount] = useState(0)
  const [watcherCount, setWatcherCount] = useState(0)
  const { userId } = useAuthenticatedSession()
  const [watcherLoading, setWatcherLoading] = useState(false)
  const [disablePair, setDisablePair] = useState(false)

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
    addViews()
  }, [post])

  async function handleAddPair() {
    setWatcherLoading(true)
    await watcherMutation({ userId, postId: post.id })
    const updatedPost = (await invoke(getPost, {
      id: post.id,
    })) as PostsWithIncludes

    setWatcherCount(updatedPost.postWatchers.length)
    setWatcherLoading(false)
  }

  return (
    <div className="px-4">
      <dl className="mt-6 text-sm border-gray-200 border-y space-y-6 divide-y divide-gray-100 leading-4">
        {postInfo.map((info, idx) => (
          <InfoList center={true} key={idx} {...info} />
        ))}
        <div className="w-full mx-auto lg:w-3/4">
          <div className="flex justify-between py-6 gap-x-6">
            <dt className="font-medium text-gray-900">Preferred Locations:</dt>
            <dd className="text-gray-900 font-base">
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
            disabled={disablePair}
            loading={watcherLoading}
            onClick={handleAddPair}
            leftIcon={<LinkIcon className="flex-none w-6 h-6 pr-2 text-white" aria-hidden="true" />}
          >
            {watcherCount} Pair Requests
          </Button>
        </div>
      </div>
    </div>
  )
}
