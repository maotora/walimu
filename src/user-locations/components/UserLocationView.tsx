import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useState, useEffect } from "react"
import { ListInfoProps, InfoList } from "src/users/components/UserView"
import { createLocationName } from "utils"
import { Prisma } from "@prisma/client"

export type UserLocationsWithIncludes = Prisma.UserLocationGetPayload<{
  include: {
    location: true
  }
}>

export default function UserLocationsView(props: { userLocations: UserLocationsWithIncludes[] }) {
  const { userLocations } = props
  const router = useRouter()
  const [userLocationInfo, setUserLocationInfo] = useState<ListInfoProps[]>([])

  useEffect(() => {
    const data = userLocations.map(({ location }, idx) => ({
      label: `Priority: ${idx + 1}`,
      value: createLocationName(location, true, true),
    }))
    setUserLocationInfo(data)
  }, [userLocations])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 leading-7">Preferred Location</h2>
      <p className="mt-1 text-sm text-gray-500 leading-6">
        The system will alert you if one of your preferred location is added.
      </p>
      <ul
        role="list"
        className="w-full mt-6 text-sm border-t border-gray-200 lg:w-3/4 divide-y divide-gray-100 leading-6"
      >
        {userLocationInfo.map((info, idx) => (
          <InfoList {...info} key={idx} />
        ))}
      </ul>
      <>
        <div className="flex pt-6 border-t border-gray-100">
          <button
            type="button"
            className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
            onClick={() => router.push(Routes.NewUserLocationsPage())}
          >
            <span aria-hidden="true">+</span> Add preferred locations
          </button>
        </div>
      </>
    </div>
  )
}
