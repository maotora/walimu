import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateViewerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateViewerSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const viewer = await db.viewer.create({ data: input })

    return viewer
  }
)
