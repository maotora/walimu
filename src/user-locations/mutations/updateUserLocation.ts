import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateUserLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateUserLocationSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userLocation = await db.userLocation.update({ where: { id }, data })

    return userLocation
  }
)
