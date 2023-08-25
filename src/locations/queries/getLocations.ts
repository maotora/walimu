import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take = 100 }: GetLocationsInput) => {
    const {
      items: locations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.location.count({ where }),
      query: (paginateArgs) => db.location.findMany({ ...paginateArgs, where, orderBy, include }),
    })

    return {
      locations,
      nextPage,
      hasMore,
      count,
    }
  }
)
