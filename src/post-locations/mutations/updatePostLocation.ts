import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePostLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePostLocationSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const postLocation = await db.postLocation.update({ where: { id }, data })

    return postLocation
  }
)
