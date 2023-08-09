import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSchoolEducationLevelSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSchoolEducationLevelSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const schoolEducationLevel = await db.schoolEducationLevel.create({
      data: input,
    })

    return schoolEducationLevel
  }
)
