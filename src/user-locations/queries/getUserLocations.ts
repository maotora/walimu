import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetUserLocationsInput
  extends Pick<
    Prisma.UserLocationFindManyArgs,
    "where" | "orderBy" | "skip" | "take" | "include"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take = 100 }: GetUserLocationsInput) => {
    const {
      items: userLocations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.userLocation.count({ where }),
      query: (paginateArgs) =>
        db.userLocation.findMany({ ...paginateArgs, where, orderBy, include }),
    })

    return {
      userLocations,
      nextPage,
      hasMore,
      count,
    }
  }
)
