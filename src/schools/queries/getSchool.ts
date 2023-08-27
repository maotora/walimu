import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetSchool = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSchool), resolver.authorize(), async ({ id }) => {
  const school = await db.school.findFirst({
    where: { id },
    include: { location: true },
  })

  if (!school) throw new NotFoundError()

  return school
})
