import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetSchoolsInput
  extends Pick<Prisma.SchoolFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take = 100 }: GetSchoolsInput) => {
    const {
      items: schools,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.school.count({ where }),
      query: (paginateArgs) => db.school.findMany({ ...paginateArgs, where, orderBy, include }),
    })

    return {
      schools,
      nextPage,
      hasMore,
      count,
    }
  }
)
