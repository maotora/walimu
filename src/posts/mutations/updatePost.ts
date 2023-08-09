import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePostSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePostSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.update({ where: { id }, data })

    return post
  }
)
