import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  id: z.number().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  const user = await db.user.findFirst({
    where: { id },
    select: {
      id: true,
      phone: true,
      email: true,
    },
  })

  if (!user) throw new NotFoundError()

  return user
})
