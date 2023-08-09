import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePostLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePostLocationSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const postLocation = await db.postLocation.deleteMany({ where: { id } })

    return postLocation
  }
)
