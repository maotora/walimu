import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSchoolSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSchoolSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const school = await db.school.create({ data: input })

    return school
  }
)
