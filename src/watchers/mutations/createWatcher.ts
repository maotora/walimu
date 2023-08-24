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
      const pair = await db.watcher.upsert({
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

      return { pair }
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
      const pair = await db.watcher.update({
        where: {
          id: activeWatcher.id,
        },
        data: {
          approved: !activeWatcher.approved,
        },
      })

      const pairCount = await db.watcher.count({
        where: {
          postId,
          approved: true,
        },
      })

      return { pair, pairCount }
    }

    const pair = await db.watcher.create({
      data: {
        postId,
        userId,
        approved: true,
      },
    })

    const pairCount = await db.watcher.count({
      where: {
        postId,
        approved: true,
      },
    })
    return { pair, pairCount }
  }
)
