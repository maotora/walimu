import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateSubjectSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subject = await db.subject.update({ where: { id }, data })

    return subject
  }
)
