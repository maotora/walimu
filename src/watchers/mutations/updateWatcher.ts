import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateWatcherSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateWatcherSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const watcher = await db.watcher.update({ where: { id }, data })

    return watcher
  }
)
