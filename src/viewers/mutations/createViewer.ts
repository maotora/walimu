import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateViewerSchema } from "../schemas"
import { Ctx } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateViewerSchema),
  resolver.authorize(),
  async ({ userId: providedUserId, postId }, ctx: Ctx) => {
    const { userId: ctxUserId } = ctx.session
    const userId = ctxUserId ? ctxUserId : providedUserId ? providedUserId : -1

    const returningViewer = await db.viewer.findUnique({
      where: {
        viwerUniqueness: {
          userId,
          postId,
        },
      },
    })

    if (returningViewer) {
      const viewer = await db.viewer.update({
        where: {
          id: returningViewer.id,
        },
        data: {
          count: returningViewer.count + 1,
        },
      })

      return viewer
    }

    const viewer = await db.viewer.create({
      data: {
        userId,
        postId,
        count: 1,
      },
    })

    return viewer
  }
)
