import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetTeachingSubject = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetTeachingSubject),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const teachingSubject = await db.teachingSubject.findFirst({
      where: { id },
    })

    if (!teachingSubject) throw new NotFoundError()

    return teachingSubject
  }
)
