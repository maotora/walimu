import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserLocationSchema } from "../schema"
import { Ctx } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateUserLocationSchema),
  resolver.authorize(),
  async ({ userId: providedUserId, ...locations }, ctx: Ctx) => {
    const { userId: ctxUserId } = ctx.session
    const userId = ctxUserId ? ctxUserId : providedUserId ? providedUserId : -1

    const userLocation = await db.userLocation.create({
      data: {
        user: {
          connect: {
            id: userId,
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

    return userLocation
  }
)
