import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateViewerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateViewerSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const viewer = await db.viewer.update({ where: { id }, data })

    return viewer
  }
)
