import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSchoolEducationLevelSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateSchoolEducationLevelSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const schoolEducationLevel = await db.schoolEducationLevel.update({
      where: { id },
      data,
    })

    return schoolEducationLevel
  }
)
