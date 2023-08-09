import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteWatcherSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteWatcherSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const watcher = await db.watcher.deleteMany({ where: { id } })

    return watcher
  }
)
