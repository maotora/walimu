import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateLocationSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.create({ data: input })

    return location
  }
)
