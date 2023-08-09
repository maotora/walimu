import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTeachingSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteTeachingSubjectSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const teachingSubject = await db.teachingSubject.deleteMany({
      where: { id },
    })

    return teachingSubject
  }
)
