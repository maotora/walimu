import { useState, Suspense } from "react"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { Button } from "@mantine/core"
import logout from "src/auth/mutations/logout"
import { invoke } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contacts", href: "/contacts" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav
        className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <Link href="/" legacyBehavior>
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">Kuhama Walimu</span>
            <img className="w-auto h-8" src="logo.png" alt="" />
          </a>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} legacyBehavior>
              <a className="text-sm font-semibold text-gray-900 leading-6">{item.name}</a>
            </Link>
          ))}
          <Suspense fallback="Loading...">
            <LoginOrDashboard />
          </Suspense>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" legacyBehavior>
              <a className="-m-1.5 p-1.5">
                <span className="sr-only">Kuhama Walimu</span>
                <img className="w-auto h-8" src="logo.png" alt="" />
              </a>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} legacyBehavior>
                    <a className="block px-3 py-2 -mx-3 text-base font-semibold text-gray-900 rounded-lg leading-7 hover:bg-gray-50">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Suspense fallback="Loading...">
                  <LoginOrDashboard isMobile={true} />
                </Suspense>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

function LoginOrDashboard(props: { isMobile?: boolean }) {
  const session = useSession()
  const { isMobile } = props
  const router = useRouter()

  async function handleLogout() {
    await invoke(logout, {})
    router.push(Routes.HomePage())
  }

  if (session.userId) {
    return (
      <>
        <Link href="/dashboard" legacyBehavior>
          <a className="text-sm font-semibold text-gray-900 leading-6">Dashboard</a>
        </Link>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    )
  }

  return isMobile ? (
    <Link href="/auth/login" legacyBehavior>
      <a className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
        Log in
      </a>
    </Link>
  ) : (
    <Link href="/auth/login" legacyBehavior>
      <a className="text-sm font-semibold text-gray-900 leading-6">
        Log in <span aria-hidden="true">&rarr;</span>
      </a>
    </Link>
  )
}
