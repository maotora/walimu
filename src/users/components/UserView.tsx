import { Prisma } from "@prisma/client"
import { useEffect, useState } from "react"
import { formatItems } from "utils"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { tailwindClassNames as classNames } from "utils"

export type UserWithIncludes = Prisma.UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    role: true
    phone: true
    gender: true
    currentSchool: {
      select: {
        name: true
        type: true
        location: true
      }
    }
  }
}>

export default function UserView(props: { user: UserWithIncludes }) {
  const { user } = props
  const [userInfo, setUserInfo] = useState<ListInfoProps[]>([])
  const router = useRouter()

  useEffect(() => {
    const { name, phone, email, gender } = user
    setUserInfo([
      {
        label: "Full Name",
        value: name || "N/A",
      },
      {
        label: "Email Address",
        value: email || "Tunalinda taarifa za mwalimu, mpaka zitakapo hitajika.",
      },
      {
        label: "Phone Number",
        value: phone || "Tunalinda taarifa za mwalimu, mpaka zitakapo hitajika.",
      },
      {
        label: "Gender",
        value: formatItems(gender),
      },
    ])
  }, [user])

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 leading-7">Profile</h2>
      <p className="mt-1 text-sm text-gray-500 leading-6">
        Taarifa za mwalimu aliyejiunga nasi, baadhi zitaonekana itakapo hitajika.
      </p>

      <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">
        {userInfo.map((info, idx) => (
          <InfoList key={idx} {...info} />
        ))}
      </dl>
      {/*<div className="flex pt-6 border-t border-gray-100">
        <button
          type="button"
          className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
          onClick={() => router.push(Routes.EditUserPage({ userId: user.id }))}
        >
          <span aria-hidden="true">+</span> Change Profile Information
        </button>
        </div>*/}
    </div>
  )
}

export type ListInfoProps = {
  label: string
  value: string
}

export function InfoList(props: ListInfoProps & { center?: boolean }) {
  const { label, value, center } = props
  return (
    <div className={classNames("w-full lg:w-3/4", center ? "mx-auto" : "")}>
      <div className="flex py-6 gap-x-6">
        <dt className="w-1/3 font-medium text-gray-900">{label}</dt>
        <dd className="w-2/3 text-gray-900 font-base">{value}</dd>
      </div>
    </div>
  )
}
