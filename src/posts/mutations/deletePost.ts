import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePostSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePostSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.deleteMany({ where: { id } })

    return post
  }
)
