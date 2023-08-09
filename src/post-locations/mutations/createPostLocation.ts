import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePostLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePostLocationSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const postLocation = await db.postLocation.create({ data: input })

    return postLocation
  }
)
