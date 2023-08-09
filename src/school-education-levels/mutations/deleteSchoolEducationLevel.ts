import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteSchoolEducationLevelSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteSchoolEducationLevelSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const schoolEducationLevel = await db.schoolEducationLevel.deleteMany({
      where: { id },
    })

    return schoolEducationLevel
  }
)
