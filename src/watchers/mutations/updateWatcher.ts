import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateWatcherSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateWatcherSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const watcher = await db.watcher.update({ where: { id }, data })

    return watcher
  }
)
