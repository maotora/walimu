import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPostLocationsInput
  extends Pick<Prisma.PostLocationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPostLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: postLocations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.postLocation.count({ where }),
      query: (paginateArgs) => db.postLocation.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      postLocations,
      nextPage,
      hasMore,
      count,
    }
  }
)
