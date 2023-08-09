import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteUserLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteUserLocationSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userLocation = await db.userLocation.deleteMany({ where: { id } })

    return userLocation
  }
)
