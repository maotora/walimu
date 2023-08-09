import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetWatchersInput
  extends Pick<Prisma.WatcherFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetWatchersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: watchers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.watcher.count({ where }),
      query: (paginateArgs) => db.watcher.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      watchers,
      nextPage,
      hasMore,
      count,
    }
  }
)
