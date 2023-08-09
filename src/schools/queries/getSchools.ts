import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetSchoolsInput
  extends Pick<Prisma.SchoolFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSchoolsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: schools,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.school.count({ where }),
      query: (paginateArgs) => db.school.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      schools,
      nextPage,
      hasMore,
      count,
    }
  }
)
