import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateWatcherSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateWatcherSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const watcher = await db.watcher.create({ data: input })

    return watcher
  }
)
