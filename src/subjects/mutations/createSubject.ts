import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSubjectSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subject = await db.subject.create({ data: input })

    return subject
  }
)
