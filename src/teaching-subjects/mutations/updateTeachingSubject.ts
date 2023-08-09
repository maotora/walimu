import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTeachingSubjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateTeachingSubjectSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const teachingSubject = await db.teachingSubject.update({
      where: { id },
      data,
    })

    return teachingSubject
  }
)
