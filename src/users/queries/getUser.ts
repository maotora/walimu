import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const GetUser = z.object({
  id: z.number().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetUser),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const userId = ctx.session.userId

    if (id !== userId) {
      //- If viewing someone else info
      const [myPost] = await db.post.findMany({
        where: { userId: userId!, postWatchers: { some: { userId: id } } },
        include: {
          postWatchers: true,
        },
      })

      const [theirPost] = await db.post.findMany({
        where: { userId: id, postWatchers: { some: { userId: userId! } } },
        include: {
          postWatchers: true,
        },
      })

      const ourIdx = myPost?.postWatchers.findIndex((watcher) => watcher.userId === id) || -1
      const theirIdx =
        theirPost?.postWatchers.findIndex((watcher) => watcher.userId === userId) || -1

      if (myPost?.postWatchers[ourIdx]?.paired || theirPost?.postWatchers[theirIdx]?.paired) {
        const user = await db.user.findFirst({
          where: { id },
          select: {
            id: true,
            name: true,
            role: true,
            phone: true,
            email: true,
            gender: true,
            currentSchool: {
              select: {
                name: true,
                type: true,
                location: true,
              },
            },
          },
        })

        if (!user) throw new NotFoundError()

        return user
      }

      const user = await db.user.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          role: true,
          gender: true,
          currentSchool: {
            select: {
              name: true,
              type: true,
              location: true,
            },
          },
        },
      })

      if (!user) throw new NotFoundError()

      return user
    }

    const user = await db.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        gender: true,
        currentSchool: {
          select: {
            name: true,
            type: true,
            location: true,
          },
        },
      },
    })

    if (!user) throw new NotFoundError()

    return user
  }
)
