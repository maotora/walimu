import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePostSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePostSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.create({ data: input })

    return post
  }
)
