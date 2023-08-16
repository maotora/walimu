import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSchoolSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateSchoolSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const school = await db.school.update({ where: { id }, data })

    return school
  }
)
