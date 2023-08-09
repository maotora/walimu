import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateUserLocationSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userLocation = await db.userLocation.create({ data: input })

    return userLocation
  }
)
