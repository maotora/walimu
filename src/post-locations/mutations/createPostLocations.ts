import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePostLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePostLocationSchema),
  resolver.authorize(),
  async ({ postId, ...locations }) => {
    const postLocation = await db.postLocation.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        location: {
          connectOrCreate: {
            create: locations,
            where: {
              locationsUniqueness: {
                ...locations,
              },
            },
          },
        },
      },
    })

    return postLocation
  }
)
