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

    if (comment) {
      const watcher = await db.watcher.upsert({
        create: {
          userId,
          postId,
          comment: comment,
          approved: false,
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

    const activeWatcher = await db.watcher.findUnique({
      where: {
        watcherUniquness: {
          userId,
          postId,
        },
      },
    })

    if (activeWatcher) {
      const updatedPair = await db.watcher.update({
        where: {
          id: activeWatcher.id,
        },
        data: {
          approved: !activeWatcher.approved,
        },
      })

      return updatedPair
    }

    const watcher = await db.watcher.create({
      data: {
        postId,
        userId,
        approved: true,
      },
    })

    return watcher
  }
)
