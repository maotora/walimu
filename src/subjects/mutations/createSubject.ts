import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSubjectSchema),
  resolver.authorize(),
  async (input) => {
    const subject = await db.subject.create({ data: input })

    return subject
  }
)
