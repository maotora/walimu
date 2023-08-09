import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetViewersInput
  extends Pick<Prisma.ViewerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetViewersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: viewers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.viewer.count({ where }),
      query: (paginateArgs) => db.viewer.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      viewers,
      nextPage,
      hasMore,
      count,
    }
  }
)
