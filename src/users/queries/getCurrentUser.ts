import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      gender: true,
      currentSchool: {
        select: {
          name: true,
          type: true,
          location: true,
        },
      },
    },
  })

  return user
}
