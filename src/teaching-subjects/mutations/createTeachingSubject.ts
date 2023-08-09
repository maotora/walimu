import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTeachingSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTeachingSubjectSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const teachingSubject = await db.teachingSubject.create({ data: input })

    return teachingSubject
  }
)
