import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateWatcherSchema } from "../schemas"
import { Ctx } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateWatcherSchema),
  resolver.authorize(),
  async ({ userId: providedUserId, postId, comment }, ctx: Ctx) => {
    const ctxUserId = ctx.session.userId
    const userId = ctxUserId ? ctxUserId : providedUserId ? providedUserId : -1
    const watcher = await db.watcher.upsert({
      create: {
        userId,
        postId,
        comment,
      },
      update: {
        comment,
      },
      where: {
        watcherUniquness: {
          userId,
          postId,
        },
      },
    })

    return watcher
  }
)
