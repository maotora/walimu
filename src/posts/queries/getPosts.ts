import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPostsInput
  extends Pick<Prisma.PostFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  async ({ where, include, orderBy, skip = 0, take = 100 }: GetPostsInput) => {
    const {
      items: posts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.post.count({ where }),
      query: (paginateArgs) => db.post.findMany({ ...paginateArgs, where, include, orderBy }),
    })

    return {
      posts,
      nextPage,
      hasMore,
      count,
    }
  }
)
