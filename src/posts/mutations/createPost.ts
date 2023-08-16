import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx } from "blitz"
import { CreatePostSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePostSchema),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const { userId: providedUserId, type, subjectIds, locationIds } = input
    const userId = ctx.session.userId || providedUserId

    const [post] = await db.$transaction(async (trx) => {
      const post = await trx.post.create({
        data: {
          type,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      const teachingSubjectData = subjectIds.map((subjectId) => ({
        subjectId,
        postId: post.id,
      }))

      const postLocationsData = locationIds.map((locationId) => ({
        locationId,
        postId: post.id,
      }))

      const teachingSubjects = await trx.teachingSubject.createMany({
        data: teachingSubjectData,
      })

      const postLocations = await trx.postLocation.createMany({
        data: postLocationsData,
      })

      return [post, postLocations, teachingSubjects]
    })

    return post
  }
)
