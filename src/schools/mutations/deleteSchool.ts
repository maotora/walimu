import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteSchoolSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteSchoolSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const school = await db.school.deleteMany({ where: { id } })

    return school
  }
)
