import { UserWithIncludes } from "src/users/components/UserView"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useState, useEffect } from "react"
import { ListInfoProps } from "src/users/components/UserView"

export default function SchoolInfo(props: { user: UserWithIncludes }) {
  const { user } = props
  const router = useRouter()
  const [schoolInfo, setSchoolInfo] = useState<ListInfoProps[]>([])

  useEffect(() => {
    const { currentSchool } = user
    const { regionName, districtName, wardName, streetName } = currentSchool?.location || {}
    const locationName = `${regionName} > ${districtName} > ${wardName} > ${streetName}`
    if (currentSchool && currentSchool.location) {
      const infoTemplate = [
        {
          label: "School Name",
          value: currentSchool.name,
        },
        {
          label: "School Type",
          value: currentSchool.type,
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
        Your current school information some may be publicily visible.
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
