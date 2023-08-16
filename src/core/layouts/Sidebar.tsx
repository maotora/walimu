import { useAuthenticatedSession } from "@blitzjs/auth"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { tailwindClassNames as classNames } from "utils"
import { BellIcon, CubeIcon, FingerPrintIcon, UserCircleIcon } from "@heroicons/react/24/outline"

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
        icon: UserCircleIcon,
        current: "dashboard".includes(router.pathname.replace("/", "")) ? true : false,
      },
      {
        name: "Posts",
        href: `/posts/user/${userId}`,
        icon: FingerPrintIcon,
        current: "posts".includes(router.pathname.replace("/", "")) ? true : false,
      },
      {
        name: "Locations",
        href: `/locations/user/${userId}`,
        icon: BellIcon,
        current: "location".includes(router.pathname.replace("/", "")) ? true : false,
      },
      {
        name: "Subscription",
        href: `/plan/user/${userId}`,
        icon: CubeIcon,
        current: "plan".includes(router.pathname.replace("/", "")) ? true : false,
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
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-indigo-600",
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
