import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetPost = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPost), resolver.authorize(), async ({ id }) => {
  const post = await db.post.findFirst({
    where: { id, active: true },
    include: {
      user: {
        include: {
          currentSchool: {
            include: {
              location: true,
              levels: true,
            },
          },
        },
      },
      locations: {
        include: {
          location: true,
        },
      },
      postViewers: true,
      postWatchers: true,
      subjects: {
        include: {
          subject: true,
        },
      },
    },
  })

  if (!post) throw new NotFoundError()

  return post
})
