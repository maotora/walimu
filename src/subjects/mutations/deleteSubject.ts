import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteSubjectSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subject = await db.subject.deleteMany({ where: { id } })

    return subject
  }
)
