import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateLocationSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({ where: { id }, data })

    return location
  }
)
