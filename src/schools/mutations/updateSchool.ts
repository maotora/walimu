import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSchoolSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateSchoolSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const school = await db.school.update({ where: { id }, data })

    return school
  }
)
