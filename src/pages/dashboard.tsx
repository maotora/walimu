import { useState, Suspense } from "react"
// import { Switch } from "@headlessui/react"
// import { tailwindClassNames as classNames } from "utils"
import Layout from "src/core/layouts/DashboardLayout"
import UserView from "src/users/components/UserView"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import Head from "next/head"
import { UserWithIncludes } from "src/users/components/UserView"
import SchoolInfo from "src/schools/components/SchoolView"

function Dashboard() {
  const [user] = useQuery(getCurrentUser, null)

  return (
    <>
      <UserView user={user as UserWithIncludes} />
      <SchoolInfo user={user as UserWithIncludes} />
    </>
  )
}

const DashboardPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </Layout>
  )
}

export default DashboardPage

/*

function Otherness() {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 leading-7">
        Language and dates
      </h2>
      <p className="mt-1 text-sm text-gray-500 leading-6">
        Choose what language and date format to use throughout your account.
      </p>

      <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Language
          </dt>
          <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">English</div>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Update
            </button>
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Date format
          </dt>
          <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">DD-MM-YYYY</div>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Update
            </button>
          </dd>
        </div>
        <Switch.Group as="div" className="flex pt-6">
          <Switch.Label
            as="dt"
            className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
            passive
          >
            Automatic timezone
          </Switch.Label>
          <dd className="flex items-center justify-end flex-auto">
            <Switch
              checked={automaticTimezoneEnabled}
              onChange={setAutomaticTimezoneEnabled}
              className={classNames(
                automaticTimezoneEnabled ? "bg-indigo-600" : "bg-gray-200",
                "flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  automaticTimezoneEnabled ? "translate-x-3.5" : "translate-x-0",
                  "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </dd>
        </Switch.Group>
      </dl>
    </div>
  )
}
*/
