import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  const user = await db.user.findFirst({
    where: { id },
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

  if (!user) throw new NotFoundError()

  return user
})
