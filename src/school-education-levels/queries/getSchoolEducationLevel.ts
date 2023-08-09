import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetSchoolEducationLevel = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetSchoolEducationLevel),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const schoolEducationLevel = await db.schoolEducationLevel.findFirst({
      where: { id },
    })

    if (!schoolEducationLevel) throw new NotFoundError()

    return schoolEducationLevel
  }
)
