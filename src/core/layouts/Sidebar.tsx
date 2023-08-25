import { useAuthenticatedSession } from "@blitzjs/auth"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { tailwindClassNames as classNames } from "utils"
import {
  IdentificationIcon,
  MegaphoneIcon,
  MapPinIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline"

type dashboardNavType = {
  name: string
  href: string
  icon: any
  current: boolean
}

export default function SideBar() {
  const { userId } = useAuthenticatedSession()
  const [navigation, setNavigation] = useState<dashboardNavType[]>([])
  const router = useRouter()

  useEffect(() => {
    const dashboardNav = [
      {
        name: "General",
        href: `/dashboard`,
        icon: IdentificationIcon,
        current: !!router.pathname
          .split("/")
          .filter(
            (name, idx, arrRef) => name && name.includes("dashboard") && idx === arrRef.length - 1
          ).length,
      },
      {
        name: "Posts",
        href: `/dashboard/posts`,
        icon: MegaphoneIcon,
        current: !!router.pathname
          .split("/")
          .filter(
            (name, idx, arrRef) => name && name.includes("posts") && idx === arrRef.length - 1
          ).length,
      },
      {
        name: "Locations",
        href: `/dashboard/locations`,
        icon: MapPinIcon,
        current: !!router.pathname
          .split("/")
          .filter(
            (name, idx, arrRef) => name && name.includes("location") && idx === arrRef.length - 1
          ).length,
      },
      {
        name: "Subscription",
        href: `/dashboard/plan`,
        icon: RocketLaunchIcon,
        current: !!router.pathname
          .split("/")
          .filter((name, idx, arrRef) => name && name.includes("plan") && idx === arrRef.length - 1)
          .length,
      },
    ]

    setNavigation(dashboardNav)
  }, [userId, router])

  return (
    <aside className="flex py-4 overflow-x-auto border-b border-gray-900/5 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link href={item.href} legacyBehavior>
                <a
                  className={classNames(
                    item.current
                      ? "bg-gray-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600",
                      "h-6 w-6 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
