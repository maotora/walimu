import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteViewerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteViewerSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const viewer = await db.viewer.deleteMany({ where: { id } })

    return viewer
  }
)
