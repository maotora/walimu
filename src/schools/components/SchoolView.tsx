import { UserWithIncludes } from "src/users/components/UserView"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useState, useEffect } from "react"
import { ListInfoProps } from "src/users/components/UserView"
import { createLocationName, formatItems } from "utils"
import { Prisma } from "@prisma/client"

export type SchoolWithIncludes = Prisma.SchoolGetPayload<{
  include: {
    location: true
  }
}>

export default function SchoolInfo(props: {
  user?: UserWithIncludes
  school?: SchoolWithIncludes
}) {
  const { user, school } = props
  const router = useRouter()
  const [schoolInfo, setSchoolInfo] = useState<ListInfoProps[]>([])

  useEffect(() => {
    const currentSchool = user?.currentSchool || school
    const locationName = createLocationName(currentSchool?.location)
    if (currentSchool && currentSchool.location) {
      const infoTemplate = [
        {
          label: "School Name",
          value: currentSchool.name,
        },
        {
          label: "School Type",
          value: formatItems(currentSchool.type),
        },
        {
          label: "School Location",
          value: locationName,
        },
      ]
      setSchoolInfo(infoTemplate)
    }
  }, [user])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 leading-7">School Information</h2>
      <p className="mt-1 text-sm text-gray-500 leading-6">
        Taarifa za shule ya mwalimu, zitaonekana kwenye posts zake.
      </p>

      {schoolInfo.length > 0 ? (
        <ul
          role="list"
          className="w-full mt-6 text-sm border-t border-gray-200 lg:w-3/4 divide-y divide-gray-100 leading-6"
        >
          {schoolInfo.map(({ label, value }, idx) => (
            <li className="flex py-6 gap-x-6" key={idx}>
              <div className="w-1/3 font-medium text-gray-900">{label}</div>
              <div className="w-2/3 text-gray-900 font-base">{value}</div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="flex pt-6 border-t border-gray-100">
            <button
              type="button"
              className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
              onClick={() => router.push(Routes.NewSchoolPage())}
            >
              <span aria-hidden="true">+</span> Add School Information
            </button>
          </div>
        </>
      )}
    </div>
  )
}
